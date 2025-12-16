import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Authenticate a user and get a Token
//@route post /api/users/auth
//@acess Public
export const authUser = asyncHandler(async (req,res) => {
  const {email,password} = req.body;
  
  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
    generateToken(res,user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  }
  else {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }
});

//@desc Register a user
//@route post /api/users
//@acess Public
export const registerUser = asyncHandler(async (req,res) => {
  const {name,email,password} = req.body;
  const userExists = await User.findOne({email});
  if(userExists) {
    res.status(400);
    throw new Error('User already Exists')
  }
  const user = await User.create({name,email,password});
  if(user) {
    generateToken(res,user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  }
  else {
    res.status(400);
    throw new Error(`Invalid user Data`);
  }
});

// @desc Logout user and clear cookie
// @route post /api/users/logout
// @acess Public
export const logoutUser = asyncHandler(async (req,res) => {
  res.cookie('jwt',"",{
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({msg:`User Logged out`});
})

//@desc get user profile
//@route get  /api/users/profile
//@acess Private
export const getUserProfile = asyncHandler(async (req,res,next) => {
  const user = { 
    _id: req.user._id,
    name: req.user.name,
    email:req.user.email
  };
  res.status(200).json(user);
})

//@desc update profile
//@route put  /api/users/profile
//@acess Private
export const updateUserProfile = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password) {
      user.password = req.body.password;
    }

    const updated = await user.save();
    res.status(200).json({
      _id : updated._id,
      name : updated.name,
      email : updated.email,
    })
  }
  else {
    res.status(404);
    throw new Error(`User not Found`);
  }
})