const router = require('express').Router();
const boardsService = require('./board.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.send(board);
  })
);

router.route('/:boardId').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getBoard(req.params.boardId);
    res.send(board);
  })
);

router.route('/:boardId').delete(
  catchErrors(async (req, res) => {
    await boardsService.deleteBoard(req.params.boardId);
    res.sendStatus(204);
  })
);

router.route('/:boardId').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    res.send(board);
  })
);

module.exports = router;
