// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../models/User.js';

export default {
    onGetAllUsers: async (req, res) => { },

    // function will retrieve a user by their UUID
    onGetUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },

    // this function will validate and create a new user given creds
    onCreateUser: async (req, res) => {
        try {
            // first make sure all fields are valid.
            const validation = makeValidation(types => ({
              payload: req.body,
              checks: {
                firstName: { type: types.string },
                lastName: { type: types.string },
                type: { type: types.enum, options: { enum: USER_TYPES } },
              }
            }));
            if (!validation.success) return res.status(400).json(validation);
            
            // now actually add the user to the database
            const { firstName, lastName, type } = req.body;
            const user = await UserModel.createUser(firstName, lastName, type);
            return res.status(200).json({ success: true, user });
          } catch (error) {
            return res.status(500).json({ success: false, error: error })
          }
    },

    onDeleteUserById: async (req, res) => { },
}