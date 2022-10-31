import {Request, Response, NextFunction, json} from 'express';
import {Types} from 'mongoose';
import SurveyCollection from '../survey/collection';


/**
 * Checks if a survey with userId exists
 */
 const isSurveyAlreadyCreated = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.session.userId);
  const survey = validFormat ? await SurveyCollection.findUserSurveyResponse(req.session.userId) : '';
  if (survey) {
    res.status(404).json({
      error: {
        surveyAlreadyExists: `You already have a survey.`
      }
    });
    return;
  }

  next();
};


/**
 * Checks if a survey with userId exists
 */
 const isSurveyExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.session.userId);
    const survey = validFormat ? await SurveyCollection.findUserSurveyResponse(req.session.userId) : '';
    if (!survey) {
      res.status(404).json({
        error: {
          surveyNotFound: `Survey with userID ${req.session.userId} does not exist.`
        }
      });
      return;
    }
  
    next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
 const isValidSurveyResponse = (req: Request, res: Response, next: NextFunction) => {
    //Create an array for the user topics
    let topics: Array<String> = []; 
    for (let subject in req.body){
      topics.push(req.body[subject]);
    }

    //Find whether user wants different or not
    const different = topics.pop();

    if (topics.length == 0) {
      res.status(400).json({
        error: 'Topics cannot be empty.'
      });
      return;
    }

    if (!((different == 'true') || (different == 'false'))){
      res.status(400).json({
        error: 'Different cannot be empty.'
      });
      return;
    }
  
    next();
  };
  
  export {
    isSurveyAlreadyCreated,
    isValidSurveyResponse,
    isSurveyExists
  };
  
