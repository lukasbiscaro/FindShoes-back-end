import { Router } from 'express'
import User from '../models/user.model.js'
import Profile from '../models/profile.model.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/auth/sign-up', async (req, res) => {

    const { firstName, lastName, email, password } = req.body

    try {

        const userExists = await User.findOne({ email })
        if (userExists) {
            throw new Error('User already exists.')
        }

        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHash,
        })

        if (newUser) {
            const newProfile = await Profile.create({ user: newUser._id })
        }

        return res.status(201).json({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            message: "User Created"
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

authRouter.post('/auth/login', async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User does not exist.')
        }

        const comparePassword = bcrypt.compareSync(password, user.passwordHash)

        if (!comparePassword) {
            throw new Error('Password incorrect')
        }

        const expiresIn = process.env.JWT_EXPIRES
        const secret = process.env.JWT_SECRET

        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn })

        return res.status(200).json({
            message: `Successfully accessed by: ${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}`,
            user: {
                user: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
                _id: user._id
            },
            jwt: token,
            logged: true,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default authRouter