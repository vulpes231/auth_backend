const whitelist = ["http://127.0.0.1:5500/", "http://localhost:2000"];

// cors option
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("You are not allowed on this server"));
    }
  },
  optionsSuccessStatus: 200,
};

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", whitelist);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

module.exports = { corsOptions, allowCrossDomain };
