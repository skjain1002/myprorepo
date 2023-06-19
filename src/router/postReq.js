const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
    const { usern, phone, email, pass } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.render("signup", {
            errMessage: `Account already exists`
        });
    }

    const hashPass = await bcrypt.hash(pass, 10);
    user = await User.create({ usern, phone, email, pass:hashPass });
    const jwtData = jwt.sign({ _id: user._id }, "abc");
    res.cookie("token", jwtData, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/");
});

module.exports = router;