const { logEvents } = require("./event-logger");

const errorLogger = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.stack}\n`, "errorlog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.export = errorLogger;
