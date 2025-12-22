const db = require('../models/index');
const Role = db.role;

const Operation = db.Sequelize.Op;


//Function to find the all roles in the system
function findRoles(role) {
  return Role.findAll({
    where: {
      Type: {
        [Operation.or]: role
      }
    }
  })
}


var roleDao = {
  findRoles: findRoles
}

module.exports = roleDao;