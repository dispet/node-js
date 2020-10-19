const logging = require('winston');
const onFinished = require('on-finished');
require('winston-daily-rotate-file');

const transport = new logging.transports.DailyRotateFile({
  filename: `${__dirname}/../logs/application-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d'
});

const timezoned = () =>
  new Date().toLocaleString('ru-Ru', {
    timeZone: 'Europe/Minsk'
  });

const options = {
  infoFile: {
    level: 'info',
    filename: `${__dirname}/../logs/app.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 1
  },
  errorFile: {
    level: 'error',
    filename: `${__dirname}/../logs/err.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 1
  },
  console: {
    level: 'debug',
    handleExceptions: false,
    json: false,
    colorize: true
  }
};

const logger = logging.createLogger({
  transports: [
    new logging.transports.File(options.infoFile),
    new logging.transports.File(options.errorFile),
    new logging.transports.Console(options.console),
    transport
  ],
  format: logging.format.combine(
    logging.format.simple(),
    logging.format.timestamp({
      format: timezoned
    }),
    logging.format.printf(
      info => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false
});

logger.url = (req, res, next) => {
  const { method, protocol, originalUrl, params, body } = req;
  if (body.password) body.password = '******';
  const host = req.headers.host;
  const start = Date.now();
  onFinished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `method: ${method} url: ${protocol}://${host}${originalUrl}  query: ${JSON.stringify(
        params
      )} body: ${JSON.stringify(body)} code: ${statusCode} [${ms} ms]`
    );
  });

  next();
};

logger.finish = exitCode => {
  /* eslint-disable-next-line */
  transport.on('finish', () => process.exit(exitCode));
  transport.close();
};

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;