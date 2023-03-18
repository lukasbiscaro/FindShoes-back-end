import { Router } from 'express'
import Product from '../models/product.model.js'
import fileUpload from '../config/cloudinary.config.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const productRouter = Router()

productRouter.get('/all-products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

productRouter.get('/all-products/:id', async (req, res) => {
    const productId = req.params.id
    try {
        const products = await Product.findById(productId)
        res.status(200).json([products])
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

productRouter.post('/upload', auth, fileUpload.single('shoeImage'), (req, res) => {
    res.status(201).json({ url: req.file.path })
})

productRouter.post('/sell', auth, async (req, res) => {
    const { image, name, brand, size, description, price } = req.body
    const userId = req.user.id
    try {
        const newProduct = await Product.create({
            image,
            brand,
            name,
            size,
            description,
            price,
            userId
        })
        res.status(201).json({ newProduct })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

productRouter.get('/sell/:id', auth, async (req, res) => {
    const productId = req.params.id
    const userId = req.user.id
    try {
        const product = await Product.findOne({ _id: productId, userId })

        if (!product) {
            res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

productRouter.get('/my-products', auth, async (req, res) => {
    const userId = req.user.id
    try {
        const products = await Product.find({ userId }).sort({ price: 1 })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

productRouter.put('/my-products/:id', auth, async (req, res) => {
    const { id } = req.params
    const { image, name, brand, size, description, price } = req.body
    const userId = req.user.id
    try {

        const updatedProduct = await Product.findByIdAndUpdate({ _id: id, userId }, { image, name, brand, size, description, price }, { new: true })

        res.status(200).json({
            updatedProduct,
            message: "Product was successfully updated."
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })
    }
})

productRouter.delete('/my-products/:id', auth, async (req, res) => {
    const { id } = req.params
    try {

        await Product.findOneAndDelete({ _id: id })
        res.status(204).json({ message: "Product was successfully deleted." })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })

    }
})

export default productRouter