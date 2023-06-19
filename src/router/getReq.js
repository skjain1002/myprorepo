const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const decode = jwt.verify(token, "abc");
        req.user = await User.findById(decode._id);
        next();
    } else {
        res.render("login");
    }
}

router.get("/", isAuth, (req, res) => {
    res.render("index", {
        myName: req.user.usern,
    });
});

router.get("/signup", (req, res) => {
    res.render("signup", {
        pageName: "SignUp Page"
    });
});

router.get("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.redirect("/");
});

router.get("/login", async (req, res) => {
    const { email, pass } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.redirect("/signup");
    }
    const isPassword = await bcrypt.compare(pass, user.pass);
    const jwtData = jwt.sign({ _id: user._id }, "abc");
    res.cookie("token", jwtData, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/");
});

module.exports = router;