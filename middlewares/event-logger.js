const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

async function logEvents(message, logName) {
  const newDate = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItem = `${newDate}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    } else {
      await fsPromises.appendFile(
        path.join(__dirname, "..", "logs", logName),
        logItem
      );
    }
  } catch (err) {
    console.error(err.stack);
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqlog.txt");
  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = { logEvents, logger };
