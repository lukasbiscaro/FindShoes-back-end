import e, { Router } from "express";
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

commentRouter.get('/all-comments/:id', async (req, res) => {
    const commentId = req.params.id
    try {
        const comment = await Comment.findById(commentId)

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })
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
        res.status(201).json({ newComment })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

commentRouter.get('/my-comment/:id', auth, async (req, res) => {
    const commentId = req.params.id
    const userId = req.user.id
    try {
        const comment = await Comment.findOne({ _id: commentId, userId })

        if (!comment) {
            res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })

    }
})

commentRouter.get('/my-comment', auth, async (req, res) => {
    const userId = req.user.id
    try {
        const comments = await Comment.find({ userId })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })
    }
})

commentRouter.put('/my-comment/:id', auth, async (req, res) => {
    const { text } = req.body
    const userId = req.user.id
    const { id } = req.params

    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: id, userId },
            { text },
            { new: true }
        )

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

commentRouter.delete('/my-comment/:id', auth, async (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    try {
        const comment = await Comment.findOneAndDelete({ _id: id, userId })
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' })
        }
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})


export default commentRouter