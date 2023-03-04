import mongoose, { Schema, Model, Document } from 'mongoose';

interface IContact extends Document {
    user: string;
    name: string;
    email: string;
    address: string;
    phone_number: string;
}

const contactSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    address: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    }
});

const Contact: Model<IContact> = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;

