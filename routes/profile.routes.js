import { Router } from "express";
import Profile from '../models/profile.model.js'
import User from '../models/user.model.js'
import auth from '../middlewares/authenticatedMiddleware.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const profileRoutes = Router()

profileRoutes.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'firstName lastName email')

        res.status(200).json(profiles)

    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

profileRoutes.get('/profile', auth, async (req, res) => {
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

profileRoutes.put('/profile', auth, async (req, res) => {
    try {

        const payload = req.body

        const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, payload, { new: true })
        // const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        // const cryptPassword = bcrypt.hashSync(req.user.password, salt)
        // const updatedPassword = await User.findByIdAndUpdate({ _id: req.user.id }, { password: password }, { new: true })

        res.status(200).json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            // password: updatedPassword
        })

    } catch (error) {
        res.status(500).json('Internal Server Error')

    }
})

profileRoutes.delete('/profile', auth, async (req, res) => {
    try {

        await Profile.findOneAndDelete({ user: req.user.id })
        await User.findOneAndDelete({ _id: req.user.id })

        res.status(204).json('User was successfully deleted.')

    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

export default profileRoutes