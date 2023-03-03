import mongoose from "mongoose";
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

export default model('User', userSchema)