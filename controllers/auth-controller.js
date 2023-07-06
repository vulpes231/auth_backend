const usersDB = {
  users: require("../models/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username and password field required" });

  const user = await usersDB.users.find(
    (person) => person.username === username
  );

  if (!user) {
    res.status(401).json({ message: "User does not exist!" });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid username OR password!" });
    } else {
      res
        .status(200)
        .json({ message: `user ${user.username} successfully logged in!` });
    }
  }
};

module.exports = loginUser;
