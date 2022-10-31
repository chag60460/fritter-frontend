import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Friend on the backend
export type Message = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    sender: string;
    reciever: string;
    message: string;
    time: Date;
};

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    
    reciever: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        required: true
    }
});

const MessageModel = model<Message>('Message', MessageSchema);
export default MessageModel;