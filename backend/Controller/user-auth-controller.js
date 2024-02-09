import bcrypt from "bcrypt";
import { User } from "../Model/user-model.js";
import { generateToken } from "../JWT/JWT.js";

//create user email and password

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedpassword });
    res.status(201).json({ success: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login for existing users
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    const findPassword = await bcrypt.compare(password, findUser.password);

    if (!findUser && !findPassword) {
      return res.status(404).json({ message: "No such user" });
    }

    //else generate token for user
    const token = generateToken(findUser._id);
    res.cookie("token", token), { httpOnly: true, maxAge: 3600000 };
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0)
      return res.status(200).json({ message: "all users founds", users });
    res.status(400).json({ message: "user list is empty" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
