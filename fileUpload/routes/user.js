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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - isSeller
 *       properties:
 *         id:
 *           type: INTEGER
 *           description: The auto-generated id of the user
 *         name:
 *           type: STRING
 *           description: The name of the user
 *         email:
 *           type: STRING
 *           description: The email of the user
 *         password:
 *           type: STRING
 *           description: The password of the user
 *         isSeller:
 *           type: BOOLEAN
 *           description: The role of the user
 *       example:
 *         name: Harsh
 *         email: hk@gmail.com
 *         password: Harsh@58
 *         isSeller: false
 */

/**
 * @swagger
 * /api/v1/user/signup/:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       403:
 *         description: There was already an existing user with the same email
 *       400:
 *         description: Validation failed for the name, email or password
 *       500:
 *         description: Some server error
 */

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

/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     summary: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            email:
 *             type: string
 *             description: The email of the user
 *            password:
 *             type: string
 *             description: The password of the user
 *          example:
 *           email: hk@gmail.com
 *           password: Harsh@58
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       403:
 *         description: No user with the entered email exists
 *       400:
 *         description: Validation failed for the name, email or password
 *       500:
 *         description: Some server error
 */

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

/**
 * @swagger
 * /api/v1/user/signout:
 *   get:
 *     summary: Sign in an out the user
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Some server error
 */
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
