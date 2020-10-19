const NOT_FOUND_ERROR = require('../../common/notfounderror');
const users = [];

const createUser = user => {
  users.push(user);
  return user;
};

const deleteUser = userId => {
  const userIndex = users.findIndex(e => e.id === userId);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find user with id: ${userId}`);
  }
  users.splice(userIndex, 1);
};

const getAll = () => {
  return users.filter(e => e);
};

const getUser = userId => {
  const userIndex = users.findIndex(e => e.id === userId);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find user with id: ${userId}`);
  }
  return users[userIndex];
};

const updateUser = user => {
  const userIndex = users.findIndex(e => e.id === user.id);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find user with id: ${user.id}`);
  }
  users[userIndex] = user;
  return user;
};

module.exports = { createUser, deleteUser, getAll, getUser, updateUser };
