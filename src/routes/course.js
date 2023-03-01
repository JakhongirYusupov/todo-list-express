const { Router } = require("express");
const Course = require("../controllers/courses");

const route = Router();

route.get("/", Course.GET);
route.get("/course", Course.POST);


module.exports = route;