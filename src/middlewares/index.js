const { readFile, writeFile } = require("../utils/index.js");
const key = process.env.PRIVATE__KEY

const TOKENV = (req, res, next) => {
  try {
    const users = readFile("users.json");
    const { token } = req.headers;

    const { id, username, email } = jwt.verify(token.token, key);
    const foundUser = users.find((el) => el.id === id && el.username === username && el.email === email);
    if (foundUser) {
      return res.json({ "status": 200, message: "user active" });
    } else {
      res.json({ "status": 404, message: "user not found" });
    }

    return next();

  } catch (error) {
    console.log(error);
  }
}

module.exports = TOKENV;