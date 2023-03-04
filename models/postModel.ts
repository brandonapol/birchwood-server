import mongoose, { Schema, Model, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    author: string;
    content: string;
}

const postSchema: Schema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

export default Post;

