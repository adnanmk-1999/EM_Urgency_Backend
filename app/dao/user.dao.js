const db = require('../models/index');
const User = db.user;
const Operation = db.Sequelize.Op;
function userCreate(user) {
  var newUser = new User(user);
  return newUser.save();
}

function userfind(username) {
  return User.findOne({
    where: {
      Username: username
    }
  })
}

function findAll() {
  return User.findAll()
}

function findByID(individualId) {
  return User.findAll({
    where: {
      id: {
        [Operation.or]: individualId
      }
    }
  })

}
function findByDepartments(departmentId) {
  return User.findAll({
    where: {
      department_id: {
        [Operation.or]: departmentId
      }
    }
  })

}

//multiple locations
function findByLocations(locationId) {
  return User.findAll({
    where: {
      location_id: {
        [Operation.or]: locationId
      }
    }
  })
}

function finduser(id) {
  return User.findByPk(id)
}

//Find userId by email
function findByEmail(item) {
  return User.findAll({
    attributes: ['Id', 'Username'],
    where: { Email: item.email }
  })
}

var userDao = {
  userCreate: userCreate,
  userfind: userfind,
  findAll: findAll,
  findByDepartments: findByDepartments,
  findByLocations: findByLocations,
  findByID: findByID,
  finduser: finduser,
  findByEmail : findByEmail
}
module.exports = userDao