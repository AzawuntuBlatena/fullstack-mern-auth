import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log("New user object:", newUser);
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req,res,next) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
           return next(errorHandler(404,'user not find'))
        }
        const isEqual = bcryptjs.compareSync(password,user.password);
        if(!isEqual){
            return next(errorHandler(401,'wrong credential'))
        }
        const token = jwt.sign({email:user.email,userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        const {password:hashedPassword, ...rest} = user._doc
        res.cookie('access-token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }

}
