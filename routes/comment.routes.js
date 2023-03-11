import { Router } from "express";
import Comment from '../models/comment.model.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const commentRouter = Router()

commentRouter.get('/all-comments', async (req, res) => {
    try {
        const comments = await Comment.find({})
        if (!comments) {
            throw new Error("There's no comments in our DB.")
        }
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

commentRouter.post('/my-comment', auth, async (req, res) => {
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