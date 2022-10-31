import type {Request, Response} from 'express';
import express from 'express';
import SurveyCollection from './collection';
import * as userValidator from '../user/middleware';
import * as surveyValidator from '../survey/middleware';
import * as util from './util';

const router = express.Router();

/** 
 * GET - get user's survey response
 * @name GET /api/survey
 * 
 * @return {SurveyResponse} - The created survey
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the survey does not exist
 * 
 */
 router.get(
    '/',
    [
        userValidator.isUserLoggedIn,
        surveyValidator.isSurveyExists
    ],
    async (req: Request, res: Response) => {
        const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
        const survey = await SurveyCollection.findUserSurveyResponse(userId);

        res.status(201).json({
            message: 'Your survey was fetched successfully.',
            survey: util.constructSurveyResponse(survey)
        });
    }

)

/** 
 * POST - create new survey entry
 * @name POST /api/survey
 *
 * @param {Array<String>} topics - The topics the user is interested
 * @param {Boolean} different - Whether or not the user wants to see differing perspective
 * @return {SurveyResponse} - The created survey
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the topics or different are empty
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        surveyValidator.isValidSurveyResponse,
        surveyValidator.isSurveyAlreadyCreated
    ],
    async (req: Request, res: Response) => {
        const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
        let topics: Array<String> = []; 
        for (let subject in req.body){
            topics.push(req.body[subject]);
        }
        const different = topics.pop() === 'true';
        const survey = await SurveyCollection.createSurvey(topics, different, userId);

        res.status(201).json({
            message: 'Your survey was created successfully.',
            survey: util.constructSurveyResponse(survey)
        });
    }
)

/**
 * PUT - change answer each day
 * @name PUT /api/survey
 * 
 * @return {SurveyResponse} - The updated Survery
 * @throws {403} - If the user is not logged in or not the user associated with the survey
 * @throws {404} - If the survey does not exist
 */
router.put(
    '/',
    [
        userValidator.isUserLoggedIn,
        surveyValidator.isSurveyExists,
        surveyValidator.isValidSurveyResponse
    ],
    async (req: Request, res: Response) => {
        const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
        let topics: Array<String> = []; 
        for (let subject in req.body){
            topics.push(req.body[subject]);
        }
        const different = topics.pop() === 'true';
        const survey = await SurveyCollection.updateUserSurveyResponse(userId, topics, different);
        res.status(200).json({
            message: 'Your survey was updated successfully.',
            freet: util.constructSurveyResponse(survey)
        });
    }
)

export {router as surveyRouter};