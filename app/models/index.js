const sequelize = require('../config/database.config')
const db = {};


const Sequelize = require("sequelize");
db.Sequelize = Sequelize

db.sequelize = sequelize
db.user = require("../models/user.model.js");
db.role = require("../models/role.model.js");
db.location = require("../models/location.model.js");
db.grade = require("../models/grade.model.js");
db.department = require("../models/department.model.js");
db.jobTitle = require("../models/jobTitle.model.js");
db.alert = require("../models/alert.model");
db.category = require("../models/category.model");
db.response = require("../models/response.model");
db.status = require("../models/status.model");


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id"
  });
  
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id" ,
  });

  db.user.belongsToMany(db.alert, {
    through: "user_alerts",
    foreignKey: "user_id",
    otherKey: "alert_id" ,
  });

  db.alert.belongsToMany(db.user, {
    through: "user_alerts",
    foreignKey: "alert_id",
    otherKey: "user_id" ,
  });

  db.user.belongsTo(db.location, {foreignKey: 'location_id'});
  db.location.hasMany(db.user, {foreignKey: 'location_id'});

  db.user.belongsTo(db.department, {foreignKey: 'department_id'});
  db.department.hasMany(db.user, {foreignKey: 'department_id'});

  db.user.belongsTo(db.grade, {foreignKey: 'grade_id'});
  db.grade.hasMany(db.user, {foreignKey: 'grade_id'});

  db.user.belongsTo(db.jobTitle, {foreignKey: 'job_title_id'});
  db.jobTitle.hasMany(db.user, {foreignKey: 'job_title_id'});

  db.alert.belongsTo(db.status, {foreignKey: 'status_id'});
  db.status.hasMany(db.alert, {foreignKey: 'status_id'});
  
  db.alert.belongsTo(db.category, {foreignKey: 'category_id'});
  db.category.hasMany(db.alert, {foreignKey: 'category_id' });
  
  db.response.belongsTo(db.user, {foreignKey: 'user_id'});
  db.user.hasMany(db.response, {foreignKey: 'user_id'}); 
 
  db.response.belongsTo(db.alert, {foreignKey: 'alert_id'});
  db.alert.hasMany(db.response, {foreignKey: 'alert_id'});  

  db.ROLES = ["User", "Admin"];
  
  module.exports = db;