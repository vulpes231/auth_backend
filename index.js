const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middlewares/event-logger");

const PORT = process.env.port || 2000;

app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/register", require("./routes/register"));
app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
