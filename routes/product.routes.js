import { Router } from 'express'
import Product from '../models/product.model.js'
import fileUpload from '../config/cloudinary.config.js'
import auth from '../middlewares/authenticatedMiddleware.js'

const productRouter = Router()

productRouter.post('/upload', auth, fileUpload.single('shoeImage'), (req, res) => {

    res.status(201).json({ url: req.file.path })
})

productRouter.post('/sell', auth, async (req, res) => {

    const { image, name, description, price } = req.body
    const userId = req.user.id

    try {

        const newProduct = await Product.create({
            image,
            name,
            description,
            price,
            userId
        })

        return res.status(201).json({ newProduct })

    } catch (error) {

        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

productRouter.get('/products', auth, async (req, res) => {

    const userId = req.user.id

    try {

        const products = await Product.find({ userId })

        res.status(200).json(products)

    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

export default productRouter