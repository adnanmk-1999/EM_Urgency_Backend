const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

const express = require('express');
const roleRouter = express.Router();

roleRouter.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

roleRouter.get("/", (req, res) => {
    res.status(200).send('This is an role based server');
});

roleRouter.get("/allcontent", controller.AllAccess);
roleRouter.get("/usercontent", authJwt.verifyToken(['User', 'Admin']), controller.UserBoard);
roleRouter.get("/admincontent", authJwt.verifyToken(['Admin']), controller.AdminBoard);

module.exports = roleRouter;