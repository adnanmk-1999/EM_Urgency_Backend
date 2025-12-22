const Sequelize = require('sequelize');
const db = require('../config/database.config');

const Alert = db.define("alerts", {
  Id: {
    type: Sequelize.BIGINT,
    field: "id",
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  Date: {
    allowNull: false,
    field: "date",
    type: Sequelize.DATEONLY
  },
  Subject: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "subject"
  },
  Message: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "message"
  },
  SentCount: {
    type: Sequelize.INTEGER,
    field: "sent_count",
    // defaultValue: 0    
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

module.exports = Alert;