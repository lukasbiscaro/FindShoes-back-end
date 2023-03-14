// import { Router } from 'express'
// import Product from '../models/product.model.js'

// const collectionsRoutes = Router()

// collectionsRoutes.get('/collections', async (req, res) => {
//     try {

//         const collections = await Product.find("collections")
//         res.status(200).json(collections)

//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' })
//     }
// })

// collectionsRoutes.get('/collections/:brand', async (req, res) => {
//     try {
//         const selectedBrand = req.params.brand
//         const brand = await Product.find({ collections: selectedBrand })
//         res.status(200).json(brand)

//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' })
//     }
// })

// export default collectionsRoutes