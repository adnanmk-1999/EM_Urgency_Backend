const Sequelize = require('sequelize');
const db = require('../config/database.config');


const Location = db.define("locations", {
  Id: {
    type: Sequelize.INTEGER,
    field: "id",
    primaryKey: true,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    field: "name",
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: Sequelize.fn('now'),
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    defaultValue: Sequelize.fn('now'),
    type: Sequelize.DATE
  }
});

module.exports = Location;