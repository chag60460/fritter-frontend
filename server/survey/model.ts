import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
* This file defines the properties stored in a Survery
*/

// Type definition for User on the backend
export type Survey = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    topics: Array<String>;
    different: Boolean;
    dateUpdated: Date;
    userId: String
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const SurveySchema = new Schema({
    // The selected interest topics for one's feed
    topics: {
      type: Array,
      required: true
    },
    // The option to get opposing view on one's feed
    different: {
      type: Boolean,
      required: true
    },
    //The date of the survey is updated
    dateUpdated: {
      type: Date,
      required: true
    },
    //The username of the user
    userId: {
      type: String,
      required: true
    }
  });
  
  const SurveyModel = model<Survey>('Survey', SurveySchema);
  export default SurveyModel;