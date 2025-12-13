const Sequelize = require('sequelize');
const db = require('../config/database.config');


const User = db.define("users", {
  Id: {
    type: Sequelize.BIGINT,
    field: "id",
    primaryKey: true,
    autoIncrement: true,
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
  Username: {
    type: Sequelize.STRING,
    field: "username",
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  Email: {
    type: Sequelize.STRING,
    field: "email",
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Password: {
    type: Sequelize.STRING,
    field: "password",
    allowNull: false
  },
  Gender: {
    type: Sequelize.ENUM('Male', 'Female', 'Others'),
    field: "gender",
    allowNull: false
  },
  Contact: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "contact",
    validate: {
      isNumeric: true,
      len: [10, 10]
    }
  },
  Image: {
    type: Sequelize.STRING,
    field: "image",
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  Location_Id: {
    type: Sequelize.BIGINT,
    field: "location_id",
    allowNull: false
  },
  Department_Id: {
    type: Sequelize.BIGINT,
    field: "department_id",
    allowNull: false
  },
  Grade_Id: {
    type: Sequelize.BIGINT,
    field: "grade_id",
    allowNull: false
  },
  Job_Title_Id: {
    type: Sequelize.BIGINT,
    field: "job_title_id",
    allowNull: false
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

module.exports = User;