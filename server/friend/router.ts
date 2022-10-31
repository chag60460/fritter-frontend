import type {Request, Response} from 'express';
import express from 'express';
import FriendCollection from './collection';
import * as userValidator from '../user/middleware';
import * as friendValidator from './middleware'
import * as util from './util';

const router = express.Router();

/**
 * Create a new friend request.
 *
 * @name POST /api/friends
 *
 * @return {FriendResponse} - The sent friend request
 * @throws {403} - If the user is not logged in, the user is sending itself a request, or request/friend already exists
 * @throws {404} - If the user does not exist
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      userValidator.isUserExists,
      friendValidator.isNotUserItself,
      friendValidator.isFriendRequestNotAlreadySent,
      friendValidator.isNotAlreadyFriends
    ],
    async (req: Request, res: Response) => {
      const user1_id = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const user2 = req.body.user;
      const request = await FriendCollection.sendFriendRequest(user1_id,user2);
  
      res.status(201).json({
        message: 'Your friend request was sent successfully.',
        friend: util.constructFriendResponse(request)
      });
    }
);

/**
 * Accept or decline a new friend request.
 *
 * @name PUT /api/friends
 *
 * @return {FriendResponse} - The newly accepted friend request
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the user does not exist or the request does not exist
 */
 router.put(
    '/',
    [
      userValidator.isUserLoggedIn,
      userValidator.isUserExists,
      friendValidator.isFriendRequestExists
    ],
    async (req: Request, res: Response) => {
        if (req.body.operation == "accept"){
            const user2_id = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
            const user1 = req.body.user;
            const request = await FriendCollection.acceptFriendRequest(user1,user2_id);
        
            res.status(201).json({
                message: 'Your have successfully accepted the friend request.',
                friend: util.constructFriendResponse(request)
            });
        }

        else if (req.body.operation == "decline") {
            const user2_id = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
            const user1 = req.body.user;
            await FriendCollection.declineFriendRequest(user1,user2_id);

            res.status(201).json({
                message: 'Your have successfully deleted the friend request.',
            });
        }
    }
);

/**
 * Delete a friend
 *
 * @name DELETE /api/friends
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the user does not exist or not friends with you
 */
 router.delete(
    '/',
    [
      userValidator.isUserLoggedIn,
      userValidator.isUserExists,
      friendValidator.isFriendWith
    ],
    async (req: Request, res: Response) => {
        const user1_id = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
        const user2 = req.body.user;
        await FriendCollection.deleteFriend(user1_id,user2);

        res.status(201).json({
            message: `Your have successfully deleted ${user2} from your friends.`
        });
    }
);



export {router as friendRouter};