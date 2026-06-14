const express = require ("express");
const path = require ("path");
const isAuthenticated = require("../middleware/authMiddleware");

const router=express.Router();

router.get(
    "/members/chocolate-eating-advice",
    isAuthenticated,
    (req,res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "Chocolate_Eating_Advice.html"
            )
        );
    }
);
router.get(
    "/members/harmful-metals-in-chocolate",
    isAuthenticated,
    (req,res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "Why_Is_Cocoa_Dangerous.html"
            )
        );
    }
);

module.exports=router;