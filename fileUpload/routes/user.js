const express = require("express");
const { where } = require("sequelize");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "santhosh";

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;
    const ExistingUser = await User.findOne({ where: { email } });
    if (ExistingUser) {
      return res.status(403).json("USER ALREADY EXISTS");
    }
    if (!validateName(name)) {
      return res.status(400).json("Name Validation Failed");
    }
    if (!validateEmail(email)) {
      return res.status(400).json("Email Validation Failed");
    }
    if (!validatePassword(password)) {
      return res.status(400).json("Password Validation Failed");
    }
    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));
    console.log(hashedPassword);
    const user = {
      name,
      email,
      password: hashedPassword,
      isSeller: isSeller || false,
    };
    const createdUser = await User.create(user);

    return res.status(201).json({
      message: `created ${createdUser.name}`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ msg: "Please enter ur mail id" });
    }
    if (password.length === 0) {
      return res.status(400).json({ msg: "Please enter ur password" });
    }
    const ExistingUser = await User.findOne({ where: { email } });
    if (!ExistingUser) {
      return res.status(404).json("USER NOT FOUND");
    }
    const passwordMatched = await bcrypt.compare(
      password,
      ExistingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).send("Error: Incorrect password");
    }

    const payload = { user: { id: ExistingUser.dataValues.id } };
    const bearerToken = await jwt.sign(payload, SECRET, {
      expiresIn: 360000,
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    console.log("Logged in successfully");
    return res
      .status(200)
      .json({ message: "Signed In Successfully!", bearerToken: bearerToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
router.get("/signout", async (_req, res) => {
  try {
    res.clearCookie("t");
    return res.status(200).json({ message: "Signed out successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
