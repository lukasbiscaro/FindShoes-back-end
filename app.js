import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import authRouter from './routes/auth.routes.js'
import welcomeRouter from './routes/welcome.routes.js'

connectDb()

const app = express()
 app.use(cors())
 app.use(express.json())

 app.use(welcomeRouter)
 app.use(authRouter)


 const PORT = process.env.PORT
 app.listen(PORT, console.log('Server listening on port: ', PORT))