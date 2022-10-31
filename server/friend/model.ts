import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Friend on the backend
export type Friend = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    user1: string;
    user2: string;
    request: string;
};

const FriendSchema = new Schema({
    user1: {
        type: String,
        required: true
    },
    
    user2: {
        type: String,
        required: true
    },

    request: {
        type: String,
        required: true
    }
});

const FriendModel = model<Friend>('Friend', FriendSchema);
export default FriendModel;