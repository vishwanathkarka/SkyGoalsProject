// app.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const User = require("./models/user");

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization") || req.cookies.token;
  if (!token) return res.sendStatus(401);

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    return next();
  });
};

const isAdmin = async (req, res, next) => {
  // validating  is email is Admin email id
  const { userId } = req.user;
  console.log(userId);
  const userData = await User.findOne({ _id: userId });
  console.log(userData);
  console.log(userData.email);
  if (userData.email == "karkavishwanath230@gmail.com") {
    return next();
  }
  return res.status(201).json({
    success: false,
    message: "You are not an Admin",
  });
};

app.post("/signup", async (req, res) => {
  // signup
  try {
    const { username, password, email, phoneNumber, age, gender, htno } =
      req.body;
    if (phoneNumber.toString().length != 10) {
      return res.status(201).json({
        success: false,
        message: "phone number should me 10 digit",
      });
    }
    const userData = await User.findOne({ email: email });
    if (userData) {
      return res.status(201).json({
        success: false,
        message: "Email is already been used",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      phoneNumber,
      age,
      gender,
      htno,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/login", async (req, res) => {
  // login
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).cookie("token", token).json({
      // cookie is been added
      status: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/userData", authenticateToken, async (req, res) => {
  // validating whether user got login or not
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    user.password = undefined; // to hide the password
    res.status(201).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/userWithAge", authenticateToken, isAdmin, async (req, res) => {
  // private route
  const { age } = req.query;
  try {
    const users = await User.find({ age: { $gt: age } });
    res.status(201).json({
      success: true,
      message: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/privateroute", authenticateToken, isAdmin, async (req, res) => {
  // private route
  try {
    const user = await User.find();
    res.status(201).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
