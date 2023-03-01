const { Router } = require("express");
const Auth = require("../controllers/auths");

const route = Router();

route.get("/register", Auth.REGISTER.GET);
route.get("/login", Auth.LOGIN.GET);

route.post("/register", Auth.REGISTER.POST);
route.post("/login", Auth.LOGIN.POST);


module.exports = route;