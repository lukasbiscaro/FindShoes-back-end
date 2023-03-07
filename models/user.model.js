import mongoose from "mongoose"
import validator from "validator"

const { model, Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `The email: ${props.value} is invalid.`
        }
    },
    passwordHash: {
        type: String,
        require: true
    }
}, { timestamps: true })

userSchema.pre('remove', async function (next) {
    try {

        await Product.deleteMany({ userId: req.user.id }).exec()
        next()

    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default model('User', userSchema)