const express = require("express");
const router = express.Router()
//brings in signup function from auth.js in handler
const {signup,signin} = require("../handler/auth");
const { model } = require("../mdels/user");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;

//after this go back to main index.js
