import { Router } from "express";
import User from '../models/user.model.js'

const userRoutes = Router()

userRoutes.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
})

userRoutes.get('/users/:id', async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            throw new Error("User does not exist")
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})


export default userRoutes