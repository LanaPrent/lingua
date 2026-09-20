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
router.get(
    "/members/exercises_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "exercises_sr.html"
            )
        );
    }
);
router.get(
    "/members/exercises_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "exercises_en.html"
            )
        );
    }
);

router.get(
    "/members/idioms_series_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_series_sr.html"
            )
        );
    }
);
router.get(
    "/members/idioms_series_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_series_en.html"
            )
        );
    }
);
router.get(
    "/members/idioms_friends_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_friends_sr.html"
            )
        );
    }
);
router.get(
    "/members/idioms_friends_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_friends_en.html"
            )
        );
    }
);
router.get(
    "/members/idioms_big_bang_theory_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_big_bang_theory_sr.html"
            )
        );
    }
);
router.get(
    "/members/idioms_big_bang_theory_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_big_bang_theory_en.html"
            )
        );
    }
);
router.get(
    "/members/idioms_two_and_a_half_men_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_two_and_a_half_men_sr.html"
            )
        );
    }
);
router.get(
    "/members/idioms_two_and_a_half_men_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_two_and_a_half_men_en.html"
            )
        );
    }
);
router.get(
    "/members/idioms_only_fools_and_horses_sr",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_only_fools_and_horses_sr.html"
            )
        );
    }
);
router.get(
    "/members/idioms_only_fools_and_horses_en",
    isAuthenticated,
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "..",
                "protected",
                "idioms_only_fools_and_horses_en.html"
            )
        );
    }
);
module.exports=router;