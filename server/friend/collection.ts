import type {HydratedDocument} from 'mongoose';
import type {Friend} from './model';
import FriendModel from './model';
import UserModel from '../user/model';

class FriendCollection {
    /**
    * Add a friend
    *
    * @param {string} user1_id - The user who sends the request
    * @param {string} user2 - The user whom the request will be sent to
    * @return {Promise<HydratedDocument<Friend>>} - The newly created request
    */
    static async sendFriendRequest(user1_id: string, user2: string): Promise<HydratedDocument<Friend>>{
        const request = "sent";
        const user_one = await UserModel.findOne({_id: user1_id});
        const user1 = user_one.username;
        const friend = new FriendModel({user1, user2, request});
        const user_two = await UserModel.findOne({username: user2});
        user_two.pendingRequests.push(user1);
        await user_two.save();
        await friend.save();
        return friend;
    }

    /**
    * Accept a friend request
    *
    * @param {string} user1 - The user who sends the request
    * @param {string} user2_id - The user whom the request will be sent to
    * @return {Promise<HydratedDocument<Friend>>} - The newly created request
    */
    static async acceptFriendRequest(user1: string, user2_id: string): Promise<HydratedDocument<Friend>>{
        const request = "accepted";
        //Find User Two username
        const user_two = await UserModel.findOne({_id: user2_id});
        const user2 = user_two.username;
        
        //Find Friend Entry and Change
        const friend = await FriendModel.findOne({user1: user1, user2: user2, request: "sent"});
        friend.request = request;
        await friend.save();
        
        //Find User Entry and Change
        const index = user_two.pendingRequests.indexOf(user1);
        user_two.pendingRequests.splice(index,1);
        await user_two.save();

        return friend;
    }

    /**
    * Decline a friend request
    *
    * @param {string} user1 - The user who sends the request
    * @param {string} user2_id - The user whom the request will be sent to
    * @return {Promise<boolean>} - The newly created request
    */
     static async declineFriendRequest(user1: string, user2_id: string): Promise<boolean>{
        //Find User Two username
        const user_two = await UserModel.findOne({_id: user2_id});
        const user2 = user_two.username;
        
        //Find Friend Entry and Change
        const friend = await FriendModel.deleteOne({user1: user1, user2: user2, request: "sent"});
        
        //Find User Entry and Change
        const index = user_two.pendingRequests.indexOf(user1);
        user_two.pendingRequests.splice(index,1);
        await user_two.save();

        return friend !== null;
    }

    /**
    * Delete a friend
    *
    * @param {string} user1_id - The user initiates the delete
    * @param {string} user2 - The friend to be deleted
    * @return {Promise<boolean>} - The newly created request
    */
     static async deleteFriend(user1_id: string, user2: string): Promise<boolean>{
        //Find User Two username
        const user_one = await UserModel.findOne({_id: user1_id});
        const user1 = user_one.username;
        
        //Find Friend Entry and Change
        const friend = await FriendModel.findOne({user1: user1, user2: user2, request: "accepted"});
        if (friend) {
            const deleted = await FriendModel.deleteOne({user1: user1, user2: user2, request: "accepted"});
            return deleted !== null;
        }
        else {
            const deleted = await FriendModel.deleteOne({user1: user2, user2: user1, request: "accepted"});
            return deleted !== null;
        }  
    }
}

export default FriendCollection;