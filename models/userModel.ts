import mongoose, { Schema, Model, Document, ObjectId } from 'mongoose';

// TODO - Read Mongoose docs for Document
interface IUser extends Document {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
}, {
    timestamps: true
})

// const Contact: Model<IContact> = mongoose.model<IContact>('Contact', contactSchema);
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User