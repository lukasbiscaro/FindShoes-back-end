import { Router } from 'express'

const welcomeRouter = Router()

welcomeRouter.get('/welcome', async (req, res) => {
    res.send("Welcome to the FindShoes API")
})

export default welcomeRouter