import type {HydratedDocument} from 'mongoose';
import type {Friend} from './model';

type FriendResponse = {
  _id: string;
  user1: string;
  user2: string;
  request: string;
};

/**
 * Transform a raw Friend object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Friend>} friend - A pair of friend
 * @returns {FriendResponse} - The friend object formatted for the frontend
 */
 const constructFriendResponse = (friend: HydratedDocument<Friend>): FriendResponse => {
  const friendCopy: Friend = {
    ...friend.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...friendCopy,
    _id: friendCopy._id.toString(),
    user1: friendCopy.user1,
    user2: friendCopy.user2,
    request: friendCopy.request
  };
};

export {
  constructFriendResponse
};
