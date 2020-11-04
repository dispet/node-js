const logger = require('./common/logging');
const notFoundError = require('./common/notfounderror');

const { PORT } = require('./common/config');
const mongoStart = require('./common/mongo');
const userService = require('./resources/users/user.service');

const app = require('./app');

mongoStart(async () => {
  try {
    await userService.getUserByLogin('admin');
  } catch (e) {
    if (e instanceof notFoundError) {
      await userService.createUser({
        login: 'admin',
        password: 'admin',
        name: 'Siarheev Siarhei Siarheevich'
      });
    } else {
      throw e;
    }
  }
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
