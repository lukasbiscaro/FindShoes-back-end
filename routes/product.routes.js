import { Router } from 'express'
import Product from '../models/product.model.js'
// import Collection from '../models/collection.model.js'
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

    console.log(req.body)
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
        return res.status(201).json({ newProduct })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

productRouter.get('/collections', async (req, res) => {
    try {

        const collections = await Product.distinct("collections")
        res.status(200).json(collections)

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
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

// productRouter.delete('/products', auth, async (req, res) => {
//     const products = req.body.products
//     try {
//         for (let i = 0; i < products.length; i++) {
//             console.log(products[i]._id)
//           }
//         await Product.findByIdAndRemove({ products })
//         res.status(204).json()

//     } catch (error) {
//         res.status(500).json('Internal Server Error')
//     }
// })

export default productRouter