const express = require("express");
const router = express.Router();

const csrfProtection = require("../middleware/csrf");

const {
    register,
    login,
    logout,
    status,
    changePassword,
    getRecoveryQuestion,
    verifyRecoveryAnswer,
    resetPassword

} = require("../controllers/authController");

router.post(
    "/register",
    csrfProtection,
    register
);

router.post(
    "/login",
    csrfProtection,
    login
);

router.post(
    "/recovery-question",
    csrfProtection,
    getRecoveryQuestion
);

router.post(
    "/verify-recovery-answer",
    csrfProtection,
    verifyRecoveryAnswer
);

router.post(
    "/reset-password",
    csrfProtection,
    resetPassword
);

router.post(
    "/change-password",
    csrfProtection,
    changePassword
);

router.post(
    "/logout",
    logout
);




router.get(
    "/status",
    status
);

module.exports = router;
