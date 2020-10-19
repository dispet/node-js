const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const BAD_REQUEST_ERROR = require('../../common/badrequesterror');

const createTask = (taskData, boardId) => {
  const task = new Task({ ...taskData, boardId });
  if (
    typeof task.title === 'undefined' ||
    typeof task.order === 'undefined' ||
    !Number.isInteger(task.order) ||
    typeof task.boardId === 'undefined'
  ) {
    throw new BAD_REQUEST_ERROR('Task title, order or boardId are not set!');
  }
  return tasksRepo.createTask(task.get());
};

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const unassignUserTasks = userId => tasksRepo.unassignUserTasks(userId);

const updateTask = async (boardId, taskId, taskData) => {
  const task = await tasksRepo.getTask(boardId, taskId);
  const editedTask = new Task(task);
  editedTask.set(taskData);
  if (
    typeof task.order === 'undefined' ||
    !Number.isInteger(task.order) ||
    typeof task.boardId === 'undefined'
  ) {
    throw new BAD_REQUEST_ERROR('Task order or boardId are not set!');
  }
  return await tasksRepo.updateTask(boardId, editedTask.get());
};

module.exports = {
  createTask,
  deleteBoardTasks,
  deleteTask,
  getBoardTasks,
  getTask,
  unassignUserTasks,
  updateTask
};
