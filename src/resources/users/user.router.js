const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.send(users.map(User.getResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.send(User.getResponse(user));
  })
);

router.route('/:userId').get(
  catchErrors(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);
    res.send(User.getResponse(user));
  })
);

router.route('/:userId').delete(
  catchErrors(async (req, res) => {
    await usersService.deleteUser(req.params.userId);
    res.sendStatus(204);
  })
);

router.route('/:userId').put(
  catchErrors(async (req, res) => {
    const user = await usersService.updateUser(req.body, req.params.userId);
    res.send(User.getResponse(user));
  })
);

module.exports = router;
