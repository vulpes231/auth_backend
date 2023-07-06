const { logEvents } = require("./event-logger");

function errorLogger(err, req, res, next) {
  logEvents(`${err.name}\t${err.stack}`, "errorLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
}

module.exports = errorLogger;
