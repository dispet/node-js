const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getBoardTasks(req.params.boardId);
    res.send(tasks);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await tasksService.createTask(req.body, req.params.boardId);
    res.send(task);
  })
);

router.route('/:taskId').get(
  catchErrors(async (req, res) => {
    const task = await tasksService.getTask(
      req.params.boardId,
      req.params.taskId
    );
    res.send(task);
  })
);

router.route('/:taskId').delete(
  catchErrors(async (req, res) => {
    await tasksService.deleteTask(req.params.boardId, req.params.taskId);
    res.sendStatus(204);
  })
);

router.route('/:taskId').put(
  catchErrors(async (req, res) => {
    const task = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.send(task);
  })
);

module.exports = router;
