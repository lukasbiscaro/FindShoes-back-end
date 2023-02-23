import { Router } from 'express'
import 'dotenv/config'

const welcomeRouter = Router()

welcomeRouter.get('/', async (req, res) => {
    res.status(200).json({ message: 'Welcome to FindShoes API' })
})

export default welcomeRouter