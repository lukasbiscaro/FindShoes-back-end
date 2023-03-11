import mongoose from "mongoose";

const { model, Schema } = mongoose

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default model('Comment', commentSchema)