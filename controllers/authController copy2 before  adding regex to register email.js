const conn = require("../config/db");
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

exports.register = async (req, res) => {

    const { username, email, password, recoveryQuestion, recoveryAnswer } = req.body;

    if (!username || !email || !password ||!recoveryQuestion ||!recoveryAnswer) {
        return res.status(400).json({
            success: false,
            message: "ui.registerAllFieldsRequired" //changed common.fieldsRequired
        });
    }

    try {
        // ===== Hash password =====
        const hash = await bcrypt.hash(password, 12);
        
        // ===== Hash recovery answer =====
        const recoveryAnswerHash = await bcrypt.hash(recoveryAnswer, 12);

        // ===== Save user =====
        conn.execute(
            `INSERT INTO auth_users (username, email, password_hash, recovery_question, recovery_answer_hash) VALUES (?, ?, ?, ?, ?)`,
           
            [username, email, hash, recoveryQuestion, recoveryAnswerHash],

            (err) => {

                if (err) {

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            success: false,
                           message: "ui.registeredUserExists"//changed register.userExists
                        });
                    }

                    logger.error(err.message);

                    return res.status(500).json({
                        success: false,
                        message:"ui.contactDatabaseError"
                        //message:"common.databaseError"
                    });
                }
                

                res.json({
                    success: true,
                    message: "ui.registerSuccess"
                    //message: "register.success"
                });
            }
        );

    } catch (err) {

        logger.error(err.message);


        res.status(500).json({
            success: false,
            message: "ui.contactServerError"
            //message: "common.serverError"
        });
    }
};
exports.login = async (req, res) => {
      console.log("LOGIN REQUEST");
    //console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message:"ui.loginAllFieldsRequired"
            //message:"common.requiredFields"
        });
    }

    conn.execute(
        "SELECT * FROM auth_users WHERE email = ?",
        [email],
       

        async (err, results) => {
            //console.log("DB results:", results);
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "ui.contactDatabaseError"
                    //message: "common.databaseError"
                });
            }
            //console.log("Number of users found:", results.length);

            if (results.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "ui.loginInvalidCredentials"
                    //message: "login.invalidCredentials"
                });
            }

            const user = results[0];
            //console.log("Found user:", user)

            const match = await bcrypt.compare(
                password,
                user.password_hash
            );
            //console.log("Password match:", match);

            if (!match) {
                return res.status(400).json({
                    success: false,
                    message: "ui.loginInvalidCredentials"
                    //message: "login.invalidCredentials"
                });
            }
            //console.log(user);

            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.email = user.email;

            res.json({
                success: true,
                //message: "Login successful"
                message: "ui.loginSuccess"
                //message: "login.success"
            });
        }
    );
};

exports.logout = (req, res) => {

    req.session.destroy(err => {

        if (err) {
            return res.status(500).json({
                success: false,
                message:"ui.logoutFailed"
                //message:"logout.failed"
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            success: true,
            message: "ui.logoutSuccess"
            //message: "logout.success"
        });
    });
};

exports.status = (req, res) => {

    if (req.session.userId) {

        res.json({
            loggedIn: true,
            username: req.session.username,
            email: req.session.email
        });

    } else {

        res.json({
            loggedIn: false
        });
    }
};

exports.getRecoveryQuestion = (req, res) => {

    const { email } = req.body;


    // ===== Check email =====

    if (!email) {

        return res.status(400).json({
            success: false,
            message:"ui.emailRequired"
            //message: "Email is required."
        });
    }


    // ===== Find user =====

    conn.execute(
        `SELECT recovery_question
         FROM auth_users
         WHERE email = ?`,

        [email],

        (err, results) => {

            if (err) {

                logger.error(err.message);

                return res.status(500).json({
                    success: false,
                    message: "ui.contactDatabaseError"
                    //message: "common.databaseError"
                });
            }


            // ===== User not found =====

            if (results.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "ui.userNotFound"
                    //message: "User not found."
                });
            }


            // ===== Check recovery question =====

            if (!results[0].recovery_question) {

                return res.status(400).json({
                    success: false,
                    message: "ui.recoveryNotConfigured"
                    //message: "Recovery is not configured for this account."
                });
            }


            // ===== Success =====

            res.json({
                success: true,
                recoveryQuestion:
                    results[0].recovery_question
            });

        }
    );
};
exports.verifyRecoveryAnswer = async (req, res) => {

    const { email, recoveryAnswer } = req.body;

    if (!email || !recoveryAnswer) {

        return res.status(400).json({
            success: false,
            message: "ui.emailAndRecoveryAnswerRequired"
            //message: "Email and recovery answer are required."
        });
    }

    try {

        conn.execute(
            `SELECT id, recovery_answer_hash
             FROM auth_users
             WHERE email = ?`,
            [email],

            async (err, results) => {

                if (err) {

                    logger.error(err.message);

                    return res.status(500).json({
                        success: false,
                        message: "ui.contactDatabaseError"
                        //message: "common.databaseError"
                    });
                }

                if (results.length === 0) {

                    return res.status(400).json({
                        success: false,
                        message: "ui.incorrectRecoveryAnswer"
                        //message: "The recovery answer is incorrect."
                    });
                }

                const user = results[0];

                const answerMatch = await bcrypt.compare(
                    recoveryAnswer,
                    user.recovery_answer_hash
                );

                if (!answerMatch) {

                    return res.status(400).json({
                        success: false,
                        message: "ui.incorrectRecoveryAnswer"
                        //message: "The recovery answer is incorrect."
                    });
                }

                // Remember which account passed recovery verification
                req.session.recoveryUserId = user.id;

                res.json({
                    success: true,
                    message: "ui.recoveryAnswerVerified"
                    //message: "Recovery answer verified."
                });
            }
        );

    } catch (err) {

        logger.error(err.message);
        console.error("Recovery answer error:", err);
    console.log("Error message:", err.message);
    console.log(
        "Translated:",
        translate(err.message)
    );

    forgotPasswordMsg.innerText =
        translate(err.message);

    forgotPasswordMsg.style.color = "red";

        return res.status(500).json({
            success: false,
            message: "ui.contactServerError",
            //message: "common.serverError"

        });
    }
};

//add password reset
exports.resetPassword = async (req, res) => {

    const {
        newPassword,
        confirmPassword
    } = req.body;

    if (!req.session.recoveryUserId) {

        return res.status(401).json({
            success: false,
            message: "ui.recoveryVerificationRequired"
            //message: "Recovery verification required."
        });
    }

    if (!newPassword || !confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "ui.registerAllFieldsRequired"
            //message: "All fields are required."
        });
    }

    if (newPassword !== confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "ui.passwordsNotMatch"
            //message: "New passwords do not match."
        });
    }

    try {

        const newPasswordHash =
            await bcrypt.hash(newPassword, 12);

        conn.execute(
            `UPDATE auth_users
             SET password_hash = ?
             WHERE id = ?`,
            [
                newPasswordHash,
                req.session.recoveryUserId
            ],

            (err) => {

                if (err) {

                    logger.error(err.message);

                    return res.status(500).json({
                        success: false,
                        message: "ui.contactDatabaseError"
                        //message: "common.databaseError"
                    });
                }

                // Recovery process is finished
                delete req.session.recoveryUserId;

                res.json({
                    success: true,
                    message: "ui.passwordResetSuccess"
                    //message: "Password reset successfully."
                });
            }
        );

    } catch (err) {

        logger.error(err.message);

        return res.status(500).json({
            success: false,
            message: "ui.contactServerError"
           //message: "common.serverError"
        });
    }
};


/* Change password */
exports.changePassword = async (req, res) => {

    const {
        currentPassword,
        newPassword,
        confirmPassword
    } = req.body;


    // ===== Check that user is logged in =====

    if (!req.session.userId) {

        return res.status(401).json({
            success: false,
            message: "ui.loginRequired"
            //message: "You must be logged in."
        });
    }


    // ===== Check that all fields were provided =====

    if (!currentPassword || !newPassword || !confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "ui.contactRequiredFields"
            //message: "All fields are required."
        });
    }


    // ===== Check that new passwords match =====

    if (newPassword !== confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "ui.passwordsNotMatch"
            //message: "New passwords do not match."
        });
    }


    try {

        // ===== Get current password hash from database =====

        conn.execute(
            "SELECT password_hash FROM auth_users WHERE id = ?",
            [req.session.userId],

            async (err, results) => {

                if (err) {

                    logger.error(err.message);

                    return res.status(500).json({
                        success: false,
                        message: "ui.contactDatabaseError"
                        //message: "common.databaseError"
                    });
                }


                // ===== Check that user exists =====

                if (results.length === 0) {

                    return res.status(404).json({
                        success: false,
                        message: "ui.userNotFound"
                        //message: "User not found."
                    });
                }


                const user = results[0];


                // ===== Check current password =====

                const passwordMatch = await bcrypt.compare(
                    currentPassword,
                    user.password_hash
                );


                if (!passwordMatch) {

                    return res.status(400).json({
                        success: false,
                        message: "ui.currentPasswordIncorrect"
                        //message: "Current password is incorrect."
                    });
                }


                // ===== Hash new password =====

                const newPasswordHash =
                    await bcrypt.hash(newPassword, 12);


                // ===== Update password in database =====
/**/
                conn.execute(
                    "UPDATE auth_users SET password_hash = ? WHERE id = ?",
                    [
                        newPasswordHash,
                        req.session.userId
                    ],

                    (err) => {

                        if (err) {

                            logger.error(err.message);

                            return res.status(500).json({
                                success: false,
                                message: "ui.contactDatabaseError"
                                //message: "common.databaseError"
                            });
                        }




                        // ===== Success =====

                        res.json({
                            success: true,
                            message: "ui.passwordChangeSuccess"
                            //message: "Password changed successfully."
                        });

                    }
                );

            }
        );

    } catch (err) {

        logger.error(err.message);

        return res.status(500).json({
            success: false,
            message: "ui.contactServerError"
            //message: "common.serverError"
        });
    }
};
