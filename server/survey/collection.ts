import type {HydratedDocument, Types} from 'mongoose';
import type {Survey} from './model';
import SurveyModel from './model';

class SurveyCollection{
    /**
    * Add a survey for a new user - for POST
    *
    * @param {Array<String>} topics - The topics a user is interested in
    * @param {Boolean} different - Whether the user wants to see differing perspective
    * @param {String} userId - The user's userId
    * @return {Promise<HydratedDocument<Survey>>} - The newly created survey
    */
    static async createSurvey(topics: Array<String>, different: Boolean, userId: Types.ObjectId | string): Promise<HydratedDocument<Survey>> {
        const dateUpdated = new Date();
        const survey = new SurveyModel({topics, different, dateUpdated, userId});
        await survey.save(); // Saves user's survey to MongoDB
        return survey.populate('userId');
    }

    /**
    * Find a user survey by userId - for GET
    *
    * @param {string} userId - The id of the survey
    * @return {Promise<HydratedDocument<Survey>> | Promise<null>} - The user survey with the given _id, if any
    */
    static async findUserSurveyResponse(userId: Types.ObjectId | string): Promise<HydratedDocument<Survey>> {
        return SurveyModel.findOne({userId: userId}).populate('userId');
    }

    /**
    * Update user survey response
    *
    * @param {string} userId - The user Id of the survey to be updated
    * @param {Array<String>} topics - A list of strings with the user's updated interested topics
    * @param {boolean} different - A boolean indicating whether the user wants to see differing perspective
    * @return {Promise<HydratedDocument<User>>} - The updated user
    */
    static async updateUserSurveyResponse(userId: Types.ObjectId | string, topics: Array<String>, different: boolean): Promise<HydratedDocument<Survey>> {
        const survey = await SurveyModel.findOne({userId: userId});
        survey.topics = topics;
        survey.different = different;
        survey.dateUpdated = new Date();
        await survey.save();
        return survey.populate('userId');
    }

    /**
    * Delete a user survey from the collection.
    *
    * @param {string} userId - The userId of the survey to be deleted
    * @return {Promise<Boolean>} - true if the user survey has been deleted, false otherwise
    */
    static async deleteUserSurvey(userId: Types.ObjectId | string): Promise<boolean> {
        const survey = await SurveyModel.deleteOne({userId: userId});
        return survey !== null;
    }
};

export default SurveyCollection;