import { Router } from 'express'
import authenticatedMiddleware from '../middlewares/authenticatedMiddleware.js'

const welcomeRouter = Router()

welcomeRouter.get('/welcome', async (req, res) => {
    res.send("Welcome to the FindShoes API")
})

export default welcomeRouter