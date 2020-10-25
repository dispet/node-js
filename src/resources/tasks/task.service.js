const tasksRepo = require('./task.mongo.repository');

const createTask = (boardId, task) =>
  tasksRepo.createTask({ ...task, boardId });

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const unassignUserTasks = userId => tasksRepo.unassignUserTasks(userId);

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

module.exports = {
  createTask,
  deleteBoardTasks,
  deleteTask,
  getBoardTasks,
  getTask,
  unassignUserTasks,
  updateTask
};
