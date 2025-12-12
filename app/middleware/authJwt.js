const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const services = require("../services/user.services.js");

const db = require("../models/index");
const e = require("express");

const User = db.user;

const checkToken = (token) => jwt.verify(token, config.secret);
verifyToken = (roles) => async (req, res, next) => {
  let token = req.headers["x-access-token"];
   try {
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    const decoded = checkToken(token, config.secret);
    if (!decoded) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    const user = await services.getUserDetails(req.userId)
    const userRole = user.roles.map(roles => roles.Type)
    const roleAccess = roles.some(item => userRole.includes(item))
    if (!roleAccess) {
      return res.status(401).send({
        message: "No Permission for Accessing the Page!"
      });
  
    }
    next();
  
   }
   catch(error){
        return res.status(401).send({
          message:"Token expired"
        })
   }


};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;