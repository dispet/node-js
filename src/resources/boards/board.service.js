const boardsRepo = require('./board.mongo.repository');
const tasksService = require('../tasks/task.service');

const createBoard = board => boardsRepo.createBoard(board);

const deleteBoard = async boardId => {
  await boardsRepo.deleteBoard(boardId);
  await tasksService.deleteBoardTasks(boardId);
};

const getAll = () => boardsRepo.getAll();

const getBoard = boardId => boardsRepo.getBoard(boardId);

const updateBoard = (boardId, board) => boardsRepo.updateBoard(boardId, board);

module.exports = { createBoard, deleteBoard, getAll, getBoard, updateBoard };
