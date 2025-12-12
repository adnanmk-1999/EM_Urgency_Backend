const Sequelize = require('sequelize');
const db = require('../config/database.config');


const Status = db.define("statuses", {
    Id: {
      type: Sequelize.INTEGER,
      field:"id",
      primaryKey: true,
      allowNull: false
    },
    Type: {
      type: Sequelize.STRING,
      field:"type",
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      field:"created_at",
      defaultValue: Sequelize.fn('now'),
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      field:"updated_at",
      defaultValue: Sequelize.fn('now'),
      type: Sequelize.DATE
    }
  });

module.exports = Status;