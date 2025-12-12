const db = require('../models/response.model');
const user = require('../models/user.model');

const alert = require('../models/alert.model');

const DB = require('../models/index');

const Op = DB.Sequelize.Op;

function findAll() {
    return db.findAll({
        attributes: [['Id', 'id'], ['Response', 'response'], 'createdAt', 'updatedAt', ['user_id', 'userId'], ['alert_id', 'alertId']]
    })
}

function findById(id) {
    return db.findByPk(id, {
        attributes: [['Id', 'id'], ['Response', 'response'], 'createdAt', 'updatedAt', ['user_id', 'userId'], ['alert_id', 'alertId']]
    });
}

function deleteById(id) {
    return db.destroy({ where: { id: id } });
}

function create(alertId, userId) {
    var newDb = new db({ alert_id: alertId, user_id: userId });
    return newDb.save();
}

function updateDb(response, id) {
    var updateDb = {
        Response: response,
    };
    return db.update(updateDb, { where: { id: id } });
}

function findAllAlerts(id) {
    return db.findAll({
        attributes: [['Id', 'id'], ['response', 'response'], 'createdAt', 'updatedAt',
        [DB.Sequelize.literal('`alert`.`date`'), 'date'],
        [DB.Sequelize.literal('`alert`.`category_id`'), 'categoryId'],
        [DB.Sequelize.fn('date_format', DB.Sequelize.col('`alert`.`date`'), '%d-%b-%Y'), 'date'],
        [DB.Sequelize.literal('`alert`.`subject`'), 'subject'],
        [DB.Sequelize.literal('`alert`.`message`'), 'message']],

        include: [{
            model: alert,
            required: true,
            attributes: []
        }],
        order: [
            ['id', 'DESC']
        ],
        where: { 'user_id': id }

    });
}

function findAlertResponses(id) {
    return db.findAll({
        attributes: [['Id', 'id'], ['response', 'response'], 'createdAt', 'updatedAt',
        [DB.Sequelize.literal('`user`.`name`'), 'name'],
        [DB.Sequelize.literal('`user`.`email`'), 'email'],
        [DB.Sequelize.literal('`user`.`image`'), 'image'],
        [DB.Sequelize.literal('`user`.`department_id`'), 'departmentId'],
        [DB.Sequelize.literal('`user`.`location_id`'), 'locationId'],
        [DB.Sequelize.literal('`user`.`job_title_id`'), 'jobtitleId']],
        include: [{
            model: user,
            required: true,
            attributes: []
        }],

        where: { 'alert_id': id }

    });


}

function barChartGet(date) {
    return db.findAndCountAll({
        attributes: [
            ['alert_id', 'alertId'],
            [DB.sequelize.fn('COUNT', DB.sequelize.col('response')), 'Responded'],
            [DB.Sequelize.literal('`alert`.`subject`'), 'subject'],
            [DB.Sequelize.literal('`alert`.`message`'), 'message'],
            [DB.Sequelize.literal('`alert`.`sent_count`'), 'sentCount'],
            [DB.Sequelize.literal('`alert`.`date`'), 'date'],

        ],
        group: 'alert_id',
        raw : true,
        include: [{
            model: alert,
            required: true,
            attributes: [],
            where : {'date': date }
        }],
        order: [
            ['id', 'DESC']
        ]
        

    });
}

function countResponded(id) {
    return db.count({ where: [{ response: { [Op.not]: null } }, { alert_id: id }] })
}

function countNotResponded(id) {
    return db.count({ where: [{ response: null }, { alert_id: id }] })
}

var responseDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateDb: updateDb,
    findAllAlerts: findAllAlerts,
    findAlertResponses: findAlertResponses,
    barChartGet: barChartGet,
    countResponded: countResponded,
    countNotResponded: countNotResponded
}

module.exports = responseDao;


// function barChartGet(){
//     return db.findAll({
//         attributes : [['Id', 'id'], ['Response', 'response'], ['alert_id' , 'alertId'],
//                     [DB.Sequelize.literal('`alert`.`subject`'), 'subject'],
//                     [DB.Sequelize.literal('`alert`.`message`'), 'message'],
//                     [DB.Sequelize.literal('`alert`.`sent_count`'), 'sentCount'],

//                 ],
//         include: [{
//             model: alert,
//             attributes: []
//           }]
//     });
// }