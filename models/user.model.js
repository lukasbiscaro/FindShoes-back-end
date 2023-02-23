import mongoose from "mongoose";
import validator from "validator"

const { model, Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

export default model('User', userSchema)