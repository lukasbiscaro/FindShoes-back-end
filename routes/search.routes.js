import { Router } from 'express'
import Product from '../models/product.model.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const searchRoutes = Router()

searchRoutes.get('/all-sneakers/search', async (req, res) => {
    const { query } = req.query
    try {
        const regex = new RegExp(query, 'i')
        const search = await Product.find({ name: { $regex: regex } })
        res.status(200).json(search)

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })

    }
})

searchRoutes.get('/my-products/search', auth, async (req, res) => {
    const { query } = req.query
    try {
        const regex = new RegExp(query, 'i')
        const search = await Product.find({ name: { $regex: regex } })
        res.status(200).json(search)

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })

    }
})

export default searchRoutes