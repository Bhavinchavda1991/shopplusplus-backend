const winston = require("winston");
const { transports } = winston;
const MongoDB = require("winston-mongodb").MongoDB;

const createMongoTransport = (level) => {
  return new MongoDB({
    db: "mongodb+srv://test:test@cluster0.oce5u.mongodb.net/",
    collection: "logs",
    level: level,
    metaKey: "meta",
    storeHost: true,
    handleExceptions: true,
    handleRejections: true,
    capped: true,
    cappedMax: 100000,
    cappedSize: 1000000,
    options: {
      useUnifiedTopology: true,
    },
    leaveConnectionOpen: true,
  });
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
    winston.format.printf((info) => {
      const { timestamp, level, message, meta } = info;
      return `${timestamp} ${level}: ${message} ${meta ? JSON.stringify(meta) : ""
        }`;
    })
  ),
  transports: [new transports.Console(), createMongoTransport("info")],
});

const customLogger = (role, action, req) => {
  const { method, url, query } = req;
  const routeName = req?.route ? req?.route?.path : "unknown route";
  logger.info({
    message: `${role}`,
    meta: {
      action: action,
      username: req?.user?.username || "",
      method,
      url: `${req.headers.origin}${url}`,
      query,
      routeName,
    },
  });
};

module.exports = customLogger;
