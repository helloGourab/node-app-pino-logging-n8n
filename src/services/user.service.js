import User from '../models/user.model.js';
import { logger } from '../config/logger.js';

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    // Changed 'error' to 'err_msg' to avoid collision
    logger.error({ msg: "DB_SAVE_FAILURE", err_msg: error.message });
    throw error;
  }
};

export const getAllUsers = async () => {
  return await User.find({});
};

export const getUserById = async (id) => {
  return await User.findById(id);
};