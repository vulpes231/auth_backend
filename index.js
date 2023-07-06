const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middlewares/event-logger");
const errorLogger = require("./middlewares/error-logger");
const corsOptions = require("./configs/cors-options");

const PORT = process.env.PORT || 2000;
app.use(corsOptions.allowCrossDomain);
app.use(cors(corsOptions));

app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/", require("./routes/root"));

app.use(errorLogger);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
