import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } =
      JSON.parse(req.body.data);

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //api for placeholder avatar
    //https://avatar-placeholder.iran.liara.run

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      //Generate JWT token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error while signing up", error.message);
    res.status(500).json({ error: "Server error while signing up" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    //Generate JWT token here
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log("Error while logging in", err.message);
    res.status(500).json({ error: "Server error while logging in" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 0 }); //Clear cookie
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Error while logging out", err.message);
    res.status(500).json({ error: "Server error while logging out" });
  }
};
