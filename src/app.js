const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./common/error-handling');
const logger = require('./common/logging');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(logger.url);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

module.exports = app;
