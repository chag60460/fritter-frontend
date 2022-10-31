import type {Request, Response} from 'express';
import express from 'express';
import MessageCollection from './collection';
import * as userValidator from '../user/middleware';
import * as friendValidator from '../friend/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new chat message.
 *
 * @name POST /api/messages
 *
 * @return {MessageResponse} - The sent message
 * @throws {403} - If the user is not logged in or the user is sending itself a message
 * @throws {404} - If the user does not exist
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      userValidator.isUserExists,
      friendValidator.isNotUserItself,
      friendValidator.isFriendWith
    ],
    async (req: Request, res: Response) => {
      const sender_id = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const reciever = req.body.user;
      const message = req.body.message
      const chat = await MessageCollection.sendMessage(sender_id,reciever,message);
  
      res.status(201).json({
        message: 'Your message was sent successfully.',
        friend: util.constructMessageResponse(chat)
      });
    }
);

export {router as messageRouter};