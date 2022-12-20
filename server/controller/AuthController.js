import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    //get all form data
    const { email, password, firstname, lastname } = req.body;
    //check if user exists with same email
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(406).json({ message: "User Already Existed" });
      return;
    }
  
    //hash the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);
  
    // store user
  
    const user = await User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);
  
    res.status(201).json({ message: "User is Created" });
  }

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(406).json({ message: "Credentials Not Found" });
      return;
    }
    const matched = await bcrypt.compareSync(password, user?.password);
    if (!matched) {
      res.status(406).json({ message: "Credentials Not Found" });
      return;
    }
  
    // When user email & password is correct, create jwt token
  
    const payload = {
      username:email,
      _id:user?._id,
      password
    }
  
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    res.json({message:"successfully logged in",token,user})
  
  }