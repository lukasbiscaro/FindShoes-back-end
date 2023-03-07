import jwt from 'jsonwebtoken'
import 'dotenv/config'

const getTokenFromHeaders = req => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const authenticatedMiddleware = (req, res, next) => {

    const token = getTokenFromHeaders(req)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing Token.' })
    }

    try {
        const secret = process.env.JWT_SECRET
        const decodedToken = jwt.verify(token, secret)
        req.user = decodedToken

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export default authenticatedMiddleware