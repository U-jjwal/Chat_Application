import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"; 
import { generateJWTToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = catchAsyncError(async(req, res, next) => {
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password) {
        return res.status(400).json({success: false, message: "Please fill all fields"});
    }
    const emailRegex = /^\S+@\S+\.\S+$/; 
    if(!emailRegex.test(email)) {
        return res.status(400).json({success: false, message: "Please enter a valid email"});
    }

    if(password.length <= 8) {
        return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
    }

    const isEmailAlreadyUsed = await User.findOne({ email });

    if(isEmailAlreadyUsed){
        return res.status(400).json({message: "Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        avatar: {
            public_id: "",
            url: "",
        },
    });
    
   
    generateJWTToken(user, "User register successfully", 201 ,res);
   
});


export const signin = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({success: false, message: "Please fill all fields"});
    }

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({success: false, message: "Invalid email or password"});
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        return res.status(400).json({success: false, message: "Invalid email or password"});
    }

    generateJWTToken(user, "User signed in successfully", 200 ,res);
});


export const signout = catchAsyncError(async(req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV != "development" ? true : false,
        })
        .json({
            success: true,
            message: "User signed out successfully",
        });
});

export const getUser = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


export const updateProfile = catchAsyncError(async(req, res, next) => {
    const {fullName, email} = req.body;
    if (!fullName || !email || fullName?.trim().length === 0 || email?.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }
    
    const avatar = req?.files?.avatar;
    let cloudinaryResponse = {};

    if(avatar){
        try{
            const oldAvatarPublicId = req.user?.avatar?.public_id;
            if(oldAvatarPublicId && oldAvatarPublicId.length > 0) {
                await cloudinary.uploader.destroy(oldAvatarPublicId);
            }
            cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
                folder: "CHAT_APP_USER_AVATARS",
                transformation: [
                    {width: 300, height: 300, crop: "limit"},
                    {quality: "auto"},
                    { fetch_format: "auto" },
                ],
            });
        }catch (error) {
            console.error("Error uploading avatar to Cloudinary:", error);
            return res.status(500).json({
                success: false, 
                message: "Error deleting old avatar",
            });

        }
    }

    let data = {
        fullName,
        email,
    };

    if(avatar && cloudinaryResponse?.public_id && cloudinaryResponse?.secure_url) {
        data.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, {
        new: true,
        runValidators: true,
    })
     
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
    });

});
