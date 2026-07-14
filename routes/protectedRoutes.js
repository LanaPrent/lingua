const express = require ("express");
const path = require ("path");
const isAuthenticated = require("../middleware/authMiddleware");

const router=express.Router();

router.get(
    "/members/chocolate_eating_advice",
    isAuthenticated,
    (req,res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "chocolate_eating_advice.html"
            )
        );
    }
);
router.get(
    "/members/why_cocoa_is_dangerous",
    isAuthenticated,
    (req,res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "why_cocoa_is_dangerous.html"
            )
        );
    }
);
router.get(
    "/members/exercises",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "exercises.html"
            )
        );
    }
);

module.exports=router;