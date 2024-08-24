const express = require("express");
const router = express.Router()

router.get("/", (req,res) => {
    res.json ({
       message:"booking ticket",});
});

module.exports = router;