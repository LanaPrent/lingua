const conn = require("../config/db");
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "common.requiredFields"
        });
    }

    try {

        const hash = await bcrypt.hash(password, 12);

        conn.execute(
            "INSERT INTO auth_users (username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, hash],

            (err) => {

                if (err) {

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            success: false,
                           message: "register.userExists"
                        });
                    }

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
