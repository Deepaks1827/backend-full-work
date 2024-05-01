import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/Apierror.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler (async(req,res) => {
    //get user details from frontend.
   const {fullName,username,email,password} = req.body
   console.log("email: ",email);
   //validation of any field empty or not 
   if ([fullName,email,username,password].some(
    (field)=>
    field?.trim()==="")) 
    {
    throw new ApiError(400,"All fields required");
   }
   //check if user already exists or not.
   const existedUser = User.findOne({
    $or:[{ username },{ email }]
   })
   if (existedUser) {
    throw new ApiError(409,"username or email already exist")
    
   }
   //check for image , check for avatar.
   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;
   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar files required")
   }
   //upload them to cloudinary
   const avatar= await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   if (!avatar) {
    throw new ApiError(400,"Avatar files required")
   }
   //create an object and make an entry on db
  const user= await User.create({
    fullName,
    avatar:avatar?.url,
    coverImage:coverImage?.url || "",
    password,
    email,
    username:username.tolowerCase()
   })
   //remove refresh token and password.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  //Checking that user is created or not 
  if (!createdUser) {
    throw new ApiError(500,"User not created Something went wrong")
    
  }
  //return response
  return res.status(201).json(
    new ApiResponse(200 , createdUser, "User created successfully")
  )

})

export {registerUser}