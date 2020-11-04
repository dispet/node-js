const { User } = require('./user.model');
const NOT_FOUND_ERROR = require('../../common/notfounderror');

const getAll = () => User.find({});

const createUser = user => User.create(user);

const getUser = async userId => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  return user;
};

const getUserByLogin = async login => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { login });
  }
  return user;
};

const deleteUser = async userId => {
  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
};

const updateUser = async (userId, userData) => {
  const user = await User.findOneAndUpdate({ _id: userId }, userData, {
    new: true
  });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  return user;
};

module.exports = {
  getAll,
  createUser,
  getUser,
  getUserByLogin,
  deleteUser,
  updateUser
};
