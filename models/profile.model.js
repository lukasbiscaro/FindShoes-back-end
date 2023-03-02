import mongoose from "mongoose";
import validator from "validator"

const { model, Schema } = mongoose

const profileSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }] ,
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

export default model('Profile', profileSchema)