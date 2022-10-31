import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Survey} from './model';

type SurveyResponse = {
  _id: string;
  topics: Array<String>;
  different: Boolean;
  dateUpdated: String;
  userId: String
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {SurveyResponse} - The freet object formatted for the frontend
 */
 const constructSurveyResponse = (survey: HydratedDocument<Survey>): SurveyResponse => {
  const surveyCopy: Survey = {
    ...survey.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const username = surveyCopy.userId;
  delete surveyCopy.userId;
  return {
    ...surveyCopy,
    _id: surveyCopy._id.toString(),
    topics: surveyCopy.topics,
    different: surveyCopy.different,
    dateUpdated: formatDate(survey.dateUpdated),
    userId: username
  };
};

export {
  constructSurveyResponse
};
