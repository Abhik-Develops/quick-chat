import UserModel from './../models/UserModel.js';
import { generateToken, verifyToken } from '../config/token.js'
import { validationResult } from 'express-validator'
import asyncHandler from 'express-async-handler'
import transporter from '../config/emailConfig.js';
import dotenv from 'dotenv'
dotenv.config({path: '../.env'});

class UserController{
    static registerUser = asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        const {name, email, password, pic} = req.body;
        const userExists = await UserModel.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error("User already exists");
        }
        const user = await UserModel.create({name, email, password, pic})
        if(user){
            const token = generateToken(user._id, '10m', true);
            const link = `${process.env.FRONTEND_URL}/verify-email/${user._id}/${token}`;
            try {
                const info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM, // sender address
                    to: email, // list of receivers
                    subject: "Quick Chat - Verification Email", // Subject line
                    html: `<h3>Click <a href=${link}>Here</a> to verify your email. This link is valid for 10 minutes.</h3>`, // html body
                });
                res.send({message: "Verification email sent. Please verify your email."});
                setTimeout(async ()=>{
                    try {
                        await UserModel.findOneAndDelete({ _id: user._id, isVerified: false });
                    } catch (error) {
                        console.error('Error deleting unverified user:', error);
                    }
                }, 600000);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
        else{
            res.status(400);
            throw new Error("Failed to create the user");
        }
    })
    static userEmailVerify = asyncHandler(async (req, res) => {
        const {id, token} = req.params;
        if(!id || !token){
            res.status(400);
            throw new Error("Id or Token not found");
        }
        try {
            const decoded = verifyToken(token, id);
            const user = await UserModel.findByIdAndUpdate(decoded.id, {isVerified:true}, {new : true});
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id, '30d'),
            })
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    })
    static authUser = asyncHandler(async (req, res) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user && (await user.matchPassword(password))){
            if(user.isVerified === false){
                res.status(401);
                throw new Error("Email is not verified");
            }
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id, '30d'),
            })
        }
        else{
            res.status(401);
            throw new Error("Invalid email or password");
        }
    })
    static allUsers = asyncHandler(async (req, res) => {
        const keyword = req.query.search ? {
            $or: [
                {
                    name: {
                    $regex: req.query.search,
                    $options: "i"
                }},
                {
                    email: {
                    $regex: req.query.search,
                    $options: "i"
                }}
            ]
        }:{};
        try {
            const users = await UserModel.find(keyword).find({_id:{$ne: req.user._id}, isVerified: true})
            res.send(users);   
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    });
    static sendPasswordResetEmail = asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        const {email} = req.body;
        const user = await UserModel.findOne({email:email});
        if(!user){
            res.status(401);
            throw new Error("Invalid email");
        }
        if(user.isVerified === false){
            res.status(401);
            throw new Error("Email is not verified");
        }
        const token = generateToken(user._id, '10m', true);
        const link = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`;
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM, // sender address
                to: email, // list of receivers
                subject: "Quick Chat - Password Reset Email", // Subject line
                html: `<h3>Click <a href=${link}>Here</a> to reset your password</h3>`, // html body
            });
            res.send({"message": "Password reset email sent successfully"});
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    })
    static userPasswordReset = asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        const {password} = req.body;
        const {id, token} = req.params;

        if(!id || !token){
            res.status(400);
            throw new Error("Id or Token not found");
        }
        try {
            const decoded = verifyToken(token, id);
            await UserModel.findByIdAndUpdate(decoded.id, {password:password}, {new: true});
            res.send({message: "Password reset is successful"});
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    })
    static userProfileUpdate = asyncHandler(async (req, res) => {
        const {userId, name, pic} = req.body;
        if(!userId){
            res.status(400);
            throw new Error("User is not logged in");
        }
        if(!name && !pic){
            res.status(400);
            throw new Error("Please fill all the fields");
        }
        const updateFields = {};
        if (name) {
            updateFields.name = name;
        }
        if (pic) {
            updateFields.pic = pic;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateFields, { new: true });
        if(!updatedUser){
            throw new Error("Can not update user profile");
        }
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
        })
    })
    static userPasswordChange = asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        const {userId, password} = req.body;
        const user = await UserModel.findByIdAndUpdate(userId, {password:password}, {new: true});
        if(!user){
            throw new Error("Can not update user password");
        }
        res.send({message:"Password changed successfully"});
    });
}

export default UserController;