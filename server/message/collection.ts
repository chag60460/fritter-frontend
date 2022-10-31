import type {HydratedDocument} from 'mongoose';
import type {Message} from './model';
import MessageModel from './model';
import UserModel from '../user/model';

class MessageCollection {
    /**
    * Send a Message to a friend
    *
    * @param {string} sender_id - The user who sends the message
    * @param {string} reciever - The user whom the message will be sent to
    * @param {string} message - The message that the sender sends to reciever
    * @return {Promise<HydratedDocument<Message>>} - The newly created chat message
    */
     static async sendMessage(sender_id: string, reciever: string, message: string): Promise<HydratedDocument<Message>>{
        const sender_user = await UserModel.findOne({_id: sender_id});
        const sender = sender_user.username;
        const time = new Date();
        const chat = new MessageModel({sender, reciever, message, time});
        await chat.save();
        return chat;
    }
}

export default MessageCollection;