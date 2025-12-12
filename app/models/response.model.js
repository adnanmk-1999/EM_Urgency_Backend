const Sequelize = require('sequelize');
const db = require('../config/database.config');

const Response = db.define("responses", {
    Id: {
        type: Sequelize.BIGINT,
        field: "id",
        primaryKey: true,
      allowNull: false,
      autoIncrement:true
    },
    Response:{
        type:  Sequelize.STRING,
        allowNull: true,
        field:"response",
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

module.exports = Response;