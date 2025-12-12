const db = require('../models/alert.model');
const category = require('../models/category.model');
const status = require('../models/status.model');


const DB = require('../models/index');


function findAll(){
    return db.findAll({
        attributes : [['Id', 'id'],
        [DB.Sequelize.fn('date_format', DB.Sequelize.col('Date'), '%d-%b-%Y'), 'date'],
                        ['Subject', 'subject'], ['Message', 'message'], 
                        ['sent_count','sentCount'] ,'createdAt', 'updatedAt', 
                        [DB.Sequelize.literal('`category`.`Type`'), 'categoryName'],
                        [DB.Sequelize.literal('`status`.`Type`'), 'statusName']],
        include: [{
            model: category,
            required: true,
            attributes: []
          },
          {
            model: status,
            required: true,
            attributes: []
          }],
        order:[
            ['id', 'DESC']
        ]
    });
}

function findById(id){
    return db.findByPk(id ,{
        attributes : [['Id', 'id'], 
        [DB.Sequelize.fn('date_format', DB.Sequelize.col('Date'), '%d-%b-%Y'), 'date'],
        ['Subject', 'subject'], ['Message', 'message'], ['sent_count','sentCount'], 'createdAt', 'updatedAt']
    });
}

function deleteById(id){
    return db.destroy({where:{id : id}});
}

function create(alerts){
    var newDb = new db(alerts);
    return newDb.save();
}

function updateDb(alert, id){
    var updateDb = {
        Date: alert.Date,
        Subject: alert.Subject,
        Message: alert.Message,
        status_id: alert.status_id,
        category_id: alert.category_id
    };
    return db.update(updateDb, {where: {Id : id}});
}

function findByIdSend(id){
    return db.findByPk(id)
}

function updateCount(count, id){
    var updateDb = {
        SentCount : count,
        status_id : 2
    }
    return db.update(updateDb, {where: {Id : id}})
}


//Count functions
function countSent(){
    return db.count({where : [{status_id : 2}]})
}

function countFail(){
    return db.count({where : [{status_id : 3}]})
}

function countDraft(){
    return db.count({where : [{status_id : 1}]})
}

var alertDao = {
    findAll : findAll,
    create : create,
    findById : findById,
    deleteById : deleteById,
    updateDb : updateDb,
    findByIdSend : findByIdSend,
    updateCount : updateCount,
    countSent : countSent,
    countFail : countFail,
    countDraft : countDraft,

}

module.exports = alertDao;
