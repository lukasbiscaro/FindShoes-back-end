import mongoose from "mongoose";

const { model, Schema } = mongoose

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default model('Profile', profileSchema)