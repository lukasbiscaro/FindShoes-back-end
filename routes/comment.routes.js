import { Router } from "express";
import Comment from '../models/comment.model.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const commentRouter = Router()

commentRouter.post('/comment', auth, async (req, res) => {

    const { text } = req.body
    const userId = req.user.id

    try {

        const newComment = await Comment.create({
            text,
            userId
        })

        return res.status(201).json({ newComment })

    } catch (error) {

        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default commentRouter