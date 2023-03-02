import { Router } from "express";
import Profile from '../models/profile.model.js'
import User from '../models/user.model.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const profileRoutes = Router()

profileRoutes.get('/profile', auth, async (req, res) => {
    try {

        const profile = await Profile.find({ user: req.user.id }).populate('user')

        if (!profile) {
            res.status(400).json("Profile not found.")
        }

        res.status(200).json(profile)

        console.log(req.user.id)

    } catch (error) {
        res.status(500).json("Internal Server Error")

    }
})

export default profileRoutes