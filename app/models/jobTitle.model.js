const Sequelize = require('sequelize');
const db = require('../config/database.config');


const JobTitle = db.define("job_titles", {
    Id: {
      type: Sequelize.INTEGER,
      field:"id",
      primaryKey: true,
      allowNull: false
    },
     Name: {
      type: Sequelize.STRING,
      field:"name",
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

module.exports = JobTitle;