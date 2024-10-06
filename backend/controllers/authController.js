import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password don't match",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "userName already exists",
      });
    }

    // hash password Here

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "female" ? girlProfilePic : boyProfilePic,
    });

    if (newUser) {
      // generate JWT token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invaild user data",
      });
    }
  } catch (error) {
    console.log("Error in SingUp controller", error.message);

    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid Username or Password",
      });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
     res.cookie("jwt", "", { maxAge: 0 });
     res.status(200).json({message:"Logged Out successfully"})
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};