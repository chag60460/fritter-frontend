import type {HydratedDocument, Types} from 'mongoose';
import type {User} from './model';
import UserModel from './model';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the UserModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class UserCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(username: string, password: string): Promise<HydratedDocument<User>> {
    const dateJoined = new Date();
    const points = 0;
    const limit = 24;
    const dateLoggedIn = new Date();
    const pendingRequests = [] as String[];
    const user = new UserModel({username, password, dateJoined, points, limit, dateLoggedIn, pendingRequests});
    await user.save(); // Saves user to MongoDB
    return user;
  }

  /**
   * Find a user by userId.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({_id: userId});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @param {string} password - The password of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} userDetails - An object with the user's updated credentials
   * @return {Promise<HydratedDocument<User>>} - The updated user
   */
  static async updateOne(userId: Types.ObjectId | string, userDetails: {password?: string; username?: string}): Promise<HydratedDocument<User>> {
    const user = await UserModel.findOne({_id: userId});
    if (userDetails.password) {
      user.password = userDetails.password;
    }

    if (userDetails.username) {
      user.username = userDetails.username;
    }

    await user.save();
    return user;
  }

  /**
     * Find a user's points
     *
     * @param {string} userId - The userId of the user to update
     * @return {Promise<Number> } - The number of points a user has
     */
   static async findPoints(userId: Types.ObjectId | string): Promise<Number> {
    let user = await UserModel.findOne({_id: userId})
    return user.points
   }

  /**
     * Increase a user's point
     *
     * @param {string} userId - The userId of the user to update
     * @return {Promise<HydratedDocument<User>> | Promise<null> } - The user with updated point
     */
   static async changePoints(userId: Types.ObjectId | string, points: number = 10): Promise<HydratedDocument<User>> {
    let user = await UserModel.findOne({_id: userId})
    user.points += points;
    await user.save();
    return user
  }

  /**
     * Change a user's time limit
     *
     * @param {string} userId - The userId of the user to update
     * @param {number} limit - the new time limit of the user
     * @return {Promise<HydratedDocument<User>> | Promise<null> } - The user with updated time limit
     */
   static async changeLimit(userId: Types.ObjectId | string, limit: number): Promise<HydratedDocument<User>> {
    let user = await UserModel.findOne({_id: userId})
    user.limit = limit;
    await user.save();
    return user
  }

  /**
     * Find a user's time limit
     *
     * @param {string} userId - The userId of the user to update
     * @return {Promise<Number>| Promise<null> } - The user with updated time limit
     */
   static async findLimit(userId: Types.ObjectId | string): Promise<Number> {
    const user = await UserModel.findOne({_id: userId});
    const current_hour = new Date().getHours();
    const session_hour = user.dateLoggedIn.getHours();
    const countdown = Math.max(user.limit - (current_hour - session_hour), 0);
    return countdown
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const user = await UserModel.deleteOne({_id: userId});
    return user !== null;
  }
}

export default UserCollection;
