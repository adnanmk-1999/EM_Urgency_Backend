const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");


var authentication = {
    authJwt : authJwt,
    verifySignUp : verifySignUp
}

module.exports = authentication;