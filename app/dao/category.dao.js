const category = require('../models/category.model')


function findByName(name) {
  return category.findOne({
    where: {
      Type: name
    }
  });
}

var categoryDao = {
  findByName: findByName
}
module.exports = categoryDao;