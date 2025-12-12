const responseDao = require('../dao/response.dao');

const config = require('../config/auth.config');

var jwt = require("jsonwebtoken");

function addDb(req, res) {

    var accessToken = req.body.accessToken;
    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        else {
            var userId = decoded.id;
            let db = {
                user_id: userId,
                Response: req.body.response,
                alert_id: req.body.alertId
            };
            responseDao.create(db)
                .then((data) => {
                    res.status(200).send("Response added");
                })
                .catch(() => {
                    res.status(500).send({ message: "Error" });
                });
        }
    })
}

function findDbById(req, res) {
    responseDao.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    responseDao.deleteById(req.params.id)
        .then((data) => {
            res.status(200).json({
                message: "response deleted"
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateDb(req, res) {
    responseDao.updateDb(req.body.response, req.params.id)
        .then((data) => {
            res.status(200).json({
                message: "updated successfully"
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findDb(req, res) {
    responseDao.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAlertResponses(req, res){
    responseDao.findAlertResponses(req.body.alertId)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({ message: "No responses" ,err});
    });


}

var responseController = {
    addDb: addDb,
    findDb: findDb,
    findDbById: findDbById,
    updateDb: updateDb,
    deleteById: deleteById,
    findAlertResponses:findAlertResponses
}

module.exports = responseController;

