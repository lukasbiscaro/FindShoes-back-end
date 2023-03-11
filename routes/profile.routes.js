import { Router } from "express"
import auth from '../middlewares/authenticatedMiddleware.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import Profile from '../models/profile.model.js'
import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import Comment from '../models/comment.model.js'

const profileRoutes = Router()

profileRoutes.get('/all-profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'firstName lastName email')
        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

profileRoutes.get('/my-profile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'firstName lastName email')
        if (!profile) {
            throw new Error("Profile not found.")
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

profileRoutes.put('/my-profile', auth, async (req, res) => {
    try {
        const payload = req.body
        const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, payload, { new: true })
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const cryptPassword = bcrypt.hashSync(req.body.password, salt)
        const updatedPassword = await User.findOneAndUpdate({ _id: req.user.id }, { passwordHash: cryptPassword }, { new: true })
        res.status(200).json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedPassword.passwordHash
        })
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

profileRoutes.delete('/my-profile', auth, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id })
        await User.findOneAndDelete({ _id: req.user.id })
        await Product.deleteMany({ userId: req.user.id })
        await Comment.deleteMany({ userId: req.user.id })
        res.status(204).json('User was successfully deleted.')
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

export default profileRoutes