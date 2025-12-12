const express = require('express');
const alertRouter = express.Router();
const { authJwt } = require("../middleware");

const alertController = require("../controllers/alert.controller");

alertRouter.post('/alert', authJwt.verifyToken(['Admin']), alertController.addDb);
alertRouter.get('/alert', authJwt.verifyToken(['Admin']), alertController.findDb);
alertRouter.get('/alert/:id', authJwt.verifyToken(['Admin']), alertController.findDbById);
alertRouter.put('/alert/:id', authJwt.verifyToken(['Admin']), alertController.updateDb);
alertRouter.delete('/alert/:id', authJwt.verifyToken(['Admin']), alertController.deleteById);

//Send routes
alertRouter.post('/sentalert/all', authJwt.verifyToken(['Admin']), alertController.sendAll);
alertRouter.post('/sentalert/departments', authJwt.verifyToken(['Admin']), alertController.sentToDepartments);
alertRouter.post('/sentalert/locations', authJwt.verifyToken(['Admin']), alertController.sentToLocations);
alertRouter.post('/sentalert/individuals', authJwt.verifyToken(['Admin']), alertController.sentToIndividuals);

//View Status Graph
alertRouter.get('/piechartsent', authJwt.verifyToken(['Admin']), alertController.pieChartSentCount);
alertRouter.get('/piechartdraft', authJwt.verifyToken(['Admin']), alertController.pieChartDraftCount);
alertRouter.get('/piechartfailed', authJwt.verifyToken(['Admin']), alertController.pieChartFailedCount);

//View Bar Graph
alertRouter.post('/barchart', authJwt.verifyToken(['Admin']), alertController.barchartdetails);










module.exports=alertRouter;