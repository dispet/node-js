const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const BAD_REQUEST_ERROR = require('../../common/badrequesterror');

const createUser = userData => {
  const user = new User(userData);
  if (typeof user.name === 'undefined') {
    throw new BAD_REQUEST_ERROR('User name is not set!');
  }
  return usersRepo.createUser(user.get());
};

const getAll = () => {
  return usersRepo.getAll();
};

const getUser = userId => usersRepo.getUser(userId);

const deleteUser = userId => {
  usersRepo.deleteUser(userId);
  tasksService.unassignUserTasks(userId);
};

const updateUser = (userData, userId) => {
  const user = usersRepo.getUser(userId);
  const editedUser = new User(user);
  editedUser.set(userData);
  if (typeof user.name === 'undefined') {
    throw new BAD_REQUEST_ERROR('User name is not set!');
  }
  return usersRepo.updateUser(editedUser.get());
};

module.exports = { createUser, deleteUser, getAll, getUser, updateUser };
