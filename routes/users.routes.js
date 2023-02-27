import { Router } from "express";
import User from '../models/user.model.js'

const userRoutes = Router()

userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
        res
    } catch (error) {
        res.status(500).json(error)
    }
})

userRoutes.get('/:id', async (req, res) => {
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

userRoutes.put('/:id', async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params

        const updatedUser = await User.findOneAndUpdate({ _id: id }, payload, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

userRoutes.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findOneAndDelete({ _id: id })

        res.status(204).json()

    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})
export default userRoutes