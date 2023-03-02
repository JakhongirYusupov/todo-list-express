const jwt = require("jsonwebtoken")
const { readFile } = require("../utils")
const key = process.env.PRIVATE__KEY

module.exports = async function (req, res, next) {
  try {
    const users = readFile("users.json");
    if (req.headers.token) {
      let userInfo = await jwt.verify(req.headers.token, key);
      const foundUser = users.find((el) => el.id === userInfo.id && el.username === userInfo.username && el.email === userInfo.email);
      if (foundUser) {
        delete foundUser.password
        req.user = foundUser
        return next();
      }

      return res.end({
        status: 404,
        message: "user not found"
      })
    } else {
      return res.send({
        status: 404,
        message: 'user not login'
      })
    }
  } catch (error) {
    res.json(error)
  }
}