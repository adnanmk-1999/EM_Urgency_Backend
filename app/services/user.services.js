const db = require('../models/index');
const User=db.user
const Role = db.role;
const getUserDetails=async(id)=> User.findOne({where: {Id: id},
    include:[{model:Role}]})

var services = {
    getUserDetails : getUserDetails
}

module.exports = services;