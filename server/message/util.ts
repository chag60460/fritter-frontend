import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Message} from './model';

type MessageResponse = {
  _id: string;
  sender: string;
  reciever: string;
  message: string;
  time: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Message object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Message>} message - A message object
 * @returns {MessageResponse} - The message object without the password
 */
const constructMessageResponse = (message: HydratedDocument<Message>): MessageResponse => {
    const messageCopy: Message = {
        ...message.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
        })
    };
  
    return {
    ...messageCopy,
    _id: messageCopy._id.toString(),
    time: formatDate(message.time)
  };
};

export {
  constructMessageResponse
};
