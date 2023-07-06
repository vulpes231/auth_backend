const { v4: uuid } = require("uuid");
const usersDB = {
  users: require("../models/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username and password is required!" });

  const duplicate = await usersDB.users.find(
    (person) => person.username === username
  );
  console.log(duplicate);

  if (duplicate) {
    res.status(409).json({ message: "username already exists!" });
  } else {
    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = { username: username, password: hashedPwd };
      usersDB.setUser([...usersDB.users, newAdmin]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "models", "users.json"),
        JSON.stringify(usersDB.admins)
      );
      console.log(usersDB.users);
      res.status(201).json({ message: `New User ${username} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = createNewUser;
