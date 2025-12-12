const alertDao = require('../dao/alert.dao');
const categoryDao = require('../dao/category.dao');
const userDao = require('../dao/user.dao');
const responseDao = require("../dao/response.dao");


const emailList = require('../helpers/createEmailList');
const sendEmail = require('../helpers/sendEmail');


function addDb(req, res){

    categoryDao.findByName(req.body.categoryName)
        .then((data) => {
            var category = data;            
            let db = {
                Date: req.body.date,
                Subject: req.body.subject,
                Message: req.body.message,
                SentCount: req.body.sentCount,
                status_id: 1,
                category_id: category.Id
            };

            alertDao.create(db)
                .then((data)=>{
                    res.status(200).send({message:"alert created",data});
                })
                .catch((error)=>{
                    console.log(error);
                });
        })
        .catch(()=>{
            res.status(401).send({message: "Category does not exist"})
        });
}

function findDbById(req, res){

    alertDao.findById(req.params.id)
        .then((data)=>{
            res.send(data);
        })
        .catch((error)=>{
            res.status(401).send({message: "Alert not found"})
        });
}

function deleteById(req, res){

    alertDao.deleteById(req.params.id)
        .then((data)=>{
            res.status(200).json({
                message:"successfully deleted",
            })
        })
        .catch((error)=>{
            res.status(401).send({message: "Unable to delete"})
        });
}

function updateDb(req, res){

    categoryDao.findByName(req.body.categoryName)
    .then((data) => {
        var category = data;
        let db = {
            Date: req.body.date,
            Subject: req.body.subject,
            Message: req.body.message,
            status_id: 1,
            category_id: category.Id
        };

        alertDao.updateDb(db, req.params.id)
        .then((data)=>{
            res.status(200).send({
                message:"updated successfully"
            })
        })
        .catch((error)=>{
            res.status(401).send({message: "Unable to update the alert!"})
        });

    })
    .catch(()=>{
        res.status(401).send({message: "Alert does not exist"})
    });
}

function findDb(req, res){

    alertDao.findAll()
        .then((data)=>{
            res.send(data);
        })
        .catch((error)=>{
            res.status(401).send({message: "Alerts not found."})

        });
}


//To send alert to all employees
function sendAll(req, res){
   var userAlert = {
        id : req.body.alertId,
        message : req.body.message,
        subject : req.body.subject
    }

    alertDao.findByIdSend(userAlert.id)
    .then(alert => {
        userDao.findAll()
            .then(users => {
                var listEmail = emailList(users)
                sendEmail(listEmail, userAlert.subject, userAlert.message)
                for(var i = 0; i < users.length; i++){
                    responseDao.create(alert.Id, users[i].Id)
                }
                alert.setUsers(users)
                .then(() => {
                    //event emitter
                    res.status(200).send({ message: "Alert sent successfully!" });
                    alertDao.updateCount(listEmail.length, userAlert.id)
                  });
        })
    })
    .catch((error)=>{
        res.status(401).send({message: "Users not found."})
    });
}

//To send alert to departments
function sentToDepartments(req, res){
    let deptAlert = {
         id : req.body.alertId,
         departmentId : req.body.departmentId,
         message : req.body.message,
         subject : req.body.subject
     }

     alertDao.findByIdSend(deptAlert.id)
     .then(alert => {
        userDao.findByDepartments(deptAlert.departmentId)
            .then(users => {
                var listEmail = emailList(users)
                sendEmail(listEmail, deptAlert.subject, deptAlert.message)
                for(var i = 0; i < users.length; i++){
                    responseDao.create(alert.Id, users[i].Id)
                }
                alert.setUsers(users)
                .then(() => {
                    res.status(200).send({ message: "Alert sent successfully!" });
                    alertDao.updateCount(listEmail.length, deptAlert.id)
                  });
        })
    })
    .catch((error)=>{
        res.status(401).send({message: "Users not found."})
    });
}


//To send to multiple location
function sentToLocations(req, res){
    let locationAlert = {
         id : req.body.alertId,
         locationId : req.body.locationId,
         message : req.body.message,
         subject : req.body.subject
     }

     alertDao.findByIdSend(locationAlert.id)
     .then(alert => {

        userDao.findByLocations(locationAlert.locationId)
            .then(users => {
                var listEmail = emailList(users)
                sendEmail(listEmail, locationAlert.subject, locationAlert.message)
                for(var i = 0; i < users.length; i++){
                    responseDao.create(alert.Id, users[i].Id)
                }
                alert.setUsers(users)
                .then(() => {
                    res.status(200).send({ message: "Alert sent successfully!" });
                    alertDao.updateCount(listEmail.length, locationAlert.id)
                  });
        })
    })
    .catch((error)=>{
        res.status(401).send({message: "Users not found."})
    });
}

//sent to individual
function sentToIndividuals(req, res){
    let individualAlert = {
         id : req.body.alertId,
         individualId : req.body.individualId,
         message : req.body.message,
         subject : req.body.subject
     }

     alertDao.findByIdSend(individualAlert.id)
     .then(alert => {
        userDao.findByID(individualAlert.individualId)
            .then(users => {
                var listEmail = emailList(users)
                sendEmail(listEmail, individualAlert.subject, individualAlert.message)

                for(var i = 0; i < users.length; i++){
                    responseDao.create(alert.Id, users[i].Id)
                }

                alert.setUsers(users)
                .then(() => {
                    res.status(200).send({ message: "Alert sent successfully!" });
                    alertDao.updateCount(listEmail.length, individualAlert.id)
                  });
        })
    })
    .catch((error)=>{
        res.status(401).send({message: "Users not found."})
    });
}

function pieChartSentCount(req ,res) {
    alertDao.countSent()
    .then((data)=>{
        res.status(200).send({Message : "Sent Count!", data : {Sent : data}})
    })
    .catch(()=> {
        res.status(401).send({message: "Error Occured !"})
    })
}

function pieChartFailedCount(req ,res) {
    alertDao.countFail()
    .then((data)=>{
        res.status(200).send({Message : "Failed Count!", data : {Failed : data}})
    })
    .catch(()=> {
        res.status(401).send({message: "Error Occured !"})
    })
}

function pieChartDraftCount(req ,res) {
    alertDao.countDraft()
    .then((data)=>{
        res.status(200).send({Message : "Draft Count!", data : {Draft : data}})
    })
    .catch(()=> {
        res.status(401).send({message: "Error Occured !"})
    })
}

function barchartdetails(req, res){

    responseDao.barChartGet(req.body.currentDate)
    .then((data)=>{

        for (i = 0; i < data.rows.length; i++){
            data.rows[i].Unresponded = data.rows[i].sentCount - data.rows[i].Responded;
        }
        res.status(200).send({data : data.rows})
    })
    .catch(()=> {
        res.status(401).send({message: "Error Occured !"})
    })
}

var alertController = {
    addDb : addDb,
    findDb : findDb,
    findDbById : findDbById,
    updateDb : updateDb,
    deleteById : deleteById,
    sendAll : sendAll,
    sentToDepartments : sentToDepartments,
    sentToLocations:sentToLocations,
    sentToIndividuals:sentToIndividuals,
    pieChartSentCount : pieChartSentCount,
    pieChartFailedCount : pieChartFailedCount,
    pieChartDraftCount : pieChartDraftCount,
    barchartdetails : barchartdetails
}

module.exports = alertController;