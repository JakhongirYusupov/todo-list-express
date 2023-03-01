const path = require("path");
const { readFile, writeFile } = require("../utils/index.js");
const jwt = require("jsonwebtoken");
const key = process.env.PRIVATE__KEY

const Auth = {
  REGISTER: {
    GET: (req, res) => {
      res.sendFile(path.resolve('src/client/register/index.html'));
    },
    POST: (req, res) => {
      try {
        const users = readFile("users.json");
        const { username, email, password } = req.body;
        const foundEmail = users.find((el) => el.email === email);
        if (foundEmail) return res.json({ status: 400, message: "This email already exist!" });
        const user = {
          id: users[users.length - 1]?.id ? users[users.length - 1]?.id + 1 : 1,
          username,
          email,
          password: jwt.sign(password, key)
        };
        users.push(user);
        writeFile("users.json", users);
        delete user.password
        return res.json({
          status: 200,
          message: "Succes registered!"
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  LOGIN: {
    GET: (req, res) => {
      res.sendFile(path.resolve('src/client/login/index.html'));
    },
    POST: (req, res) => {
      try {
        const users = readFile("users.json");

        const { email, password } = req.body;
        const foundUser = users.find((el) => el.email === email && el.password === jwt.sign(password, key));
        if (!foundUser) return res.json({ status: 400, message: "User not found!" });
        delete foundUser.password
        let token = jwt.sign(foundUser, key, { expiresIn: "15d" });
        return res.json({
          status: 200,
          message: "Succes login!",
          token
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = Auth;