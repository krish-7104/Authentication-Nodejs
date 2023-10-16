import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import ResetToken from "../models/ResetToken.js"
import { sendResetMailHandler } from "../helper/mail.js"

export const registerHandler = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ success: false, message: "All Fields Are Necessary!" })
    }
    else {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                const hashSalt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, hashSalt)
                const newUser = await User.create({ name, email, password: hashPassword })
                res.status(201).json({
                    success: true,
                    id: newUser._id,
                    message: "Register Successfull!"
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "User Already Exists"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal Server Error!" })
        }
    }
}

export const loginHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        const userData = await User.findOne({ email })
        if (!userData) {
            res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        } else {
            const comparePassword = await bcrypt.compare(password, userData.password);
            if (comparePassword) {
                const payload = {
                    id: userData._id,
                }
                const token = jwt.sign(payload, process.env.JWTSECRET)
                res.cookie("token", token)
                res.status(200).json({
                    success: true,
                    id: userData._id,
                    message: "Login Successfull!"
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid Credentials!"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

export const logoutHandler = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logout Successfull!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}


export const forgetPasswordHandler = async (req, res) => {
    const { email } = req.body
    try {
        const userData = await User.findOne({ email })
        if (!userData) {
            res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        } else {
            await ResetToken.findOneAndDelete({ userId: userData.userId })
            const newResetToken = await ResetToken.create({
                userId: userData.userId
            })
            sendResetMailHandler(userData.email, newResetToken._id, req, res);

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
