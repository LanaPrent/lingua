const conn = require("../config/db");
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

exports.register = async (req, res) => {

    const { username, email, password, recoveryQuestion, recoveryAnswer } = req.body;

    if (!username || !email || !password ||!recoveryQuestion ||!recoveryAnswer) {
        return res.status(400).json({
            success: false,
            message: "common.requiredFields"
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
                           message: "register.userExists"
                        });
                    }

                    logger.error(err.message);

                    return res.status(500).json({
                        success: false,
                        message:"common.databaseError"
                    });
                }
                

                res.json({
                    success: true,
                    message: "register.success"
                });
            }
        );

    } catch (err) {

        logger.error(err.message);


        res.status(500).json({
            success: false,
            message: "common.serverError"
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
            message:"common.requiredFields"
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
                    message: "common.databaseError"
                });
            }
            //console.log("Number of users found:", results.length);

            if (results.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "login.invalidCredentials"
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
                    message: "login.invalidCredentials"
                });
            }
            //console.log(user);

            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.email = user.email;

            res.json({
                success: true,
                //message: "Login successful"
                message: "login.success"
            });
        }
    );
};

exports.logout = (req, res) => {

    req.session.destroy(err => {

        if (err) {
            return res.status(500).json({
                success: false,
                message:"logout.failed"
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            success: true,
            message: "logout.success"
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
            message: "Email is required."
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
                    message: "common.databaseError"
                });
            }


            // ===== User not found =====

            if (results.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }


            // ===== Check recovery question =====

            if (!results[0].recovery_question) {

                return res.status(400).json({
                    success: false,
                    message: "Recovery is not configured for this account."
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
            message: "You must be logged in."
        });
    }


    // ===== Check that all fields were provided =====

    if (!currentPassword || !newPassword || !confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }


    // ===== Check that new passwords match =====

    if (newPassword !== confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "New passwords do not match."
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
                        message: "common.databaseError"
                    });
                }


                // ===== Check that user exists =====

                if (results.length === 0) {

                    return res.status(404).json({
                        success: false,
                        message: "User not found."
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
                        message: "Current password is incorrect."
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
                                message: "common.databaseError"
                            });
                        }




                        // ===== Success =====

                        res.json({
                            success: true,
                            message: "Password changed successfully."
                        });

                    }
                );

            }
        );

    } catch (err) {

        logger.error(err.message);

        return res.status(500).json({
            success: false,
            message: "common.serverError"
        });
    }
};
