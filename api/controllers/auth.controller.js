import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { userInfo } from "os";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return next(errorHandler(404, "User not found"));
    const isMatch = bcryptjs.compareSync(password, user.password);
    if(!isMatch) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const { password: pass, ...userInfo } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};