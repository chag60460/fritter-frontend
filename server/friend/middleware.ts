import type {Request, Response, NextFunction} from 'express';
import UserCollection from '../user/collection';
import FriendModel from './model'

/**
 * Checks if a user is itself
 */
 const isNotUserItself = async (req: Request, res: Response, next: NextFunction) => {
    //Find user one's username
    const user1Id = req.session.userId;
    const user_one = await UserCollection.findOneByUserId(user1Id)
    const user1_username = user_one.username as string;
    
    //Get user two's username
    const user2_username = req.body.user as string;

    //Check if the usernames are the same
    if (user1_username==user2_username) {
        res.status(403).json({
            error: `You cannot send yourself a friend request or message.`
          });
          return;   
    }

    next();
};

/**
 * Checks if a user request already exists
 */
 const isFriendRequestNotAlreadySent = async (req: Request, res: Response, next: NextFunction) => {
    //Find user one's username
    const user1Id = req.session.userId;
    const user_one = await UserCollection.findOneByUserId(user1Id)
    const user1_username = user_one.username;
    
    //Get user two's username
    const user2_username = req.body.user;
    const user_two = await UserCollection.findOneByUsername(user2_username);

    //Check if User 1 already sent a friend request to User 2
    if (user_two.pendingRequests.includes(user1_username) || user_one.pendingRequests.includes(user2_username)) {
        res.status(403).json({
            error: `The friend request already exists.`
        });
        return;  
    }
    
    next();
};

/**
 * Checks if the users are already friends
 */
 const isNotAlreadyFriends = async (req: Request, res: Response, next: NextFunction) => {
    //Find user one's username
    const user1Id = req.session.userId;
    const user_one = await UserCollection.findOneByUserId(user1Id)
    const user1_username = user_one.username;
    
    //Get user two's username
    const user2_username = req.body.user;

    //Check if User 1 is already friend with User 2
    const friend = await FriendModel.findOne({user1: user1_username, user2: user2_username, request: "accepted"});
    const friend2 = await FriendModel.findOne({user1: user2_username, user2: user1_username, request: "accepted"});
    if (friend || friend2) {
        res.status(403).json({
            error: `You are already friends with ${user2_username}.`
        });
        return;  
    }
    
    next();
};

/**
 * Checks if the users are friends to begin with
 */
 const isFriendWith = async (req: Request, res: Response, next: NextFunction) => {
    //Find user one's username
    const user1Id = req.session.userId;
    const user_one = await UserCollection.findOneByUserId(user1Id)
    const user1_username = user_one.username;
    
    //Get user two's username
    const user2_username = req.body.user;

    //Check if User 1 is already friend with User 2
    const friend = await FriendModel.findOne({user1: user1_username, user2: user2_username, request: "accepted"});
    const friend2 = await FriendModel.findOne({user1: user2_username, user2: user1_username, request: "accepted"});
    if (friend || friend2) {
        next();
    }
    
    else {
        res.status(403).json({
            error: `You are not friends with ${user2_username}.`
        });
        
        return; 
    }
};

/**
 * Checks if a user with userId exists
 */
 const isFriendRequestExists = async (req: Request, res: Response, next: NextFunction) => {
    const user2Id = req.session.userId;
    const user2 = await UserCollection.findOneByUserId(user2Id);
    const user1 = req.body.user;

    if (user2.pendingRequests.includes(user1)) {
        next();
    }
    else {
      res.status(404).json({
        error: `A user with username ${req.body.user as string} did not send you a friend request.`
      });
      return;
    }
    
  };

export {
    isFriendRequestNotAlreadySent,
    isNotUserItself,
    isFriendRequestExists,
    isNotAlreadyFriends,
    isFriendWith
};