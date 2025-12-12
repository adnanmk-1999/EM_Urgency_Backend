const express=require('express');
const responseRouter=express.Router();
const { authJwt } = require("../middleware");


const responseController=require("../controllers/response.controller");



//Create a response for a particular response
responseRouter.put('/response/:id', authJwt.verifyToken(['User','Admin']), responseController.updateDb);   

//Get responses for a particular alert
responseRouter.post('/alertresponses', authJwt.verifyToken(['User','Admin']), responseController.findAlertResponses);

//Get all responses from response table
responseRouter.get('/getresponses',authJwt.verifyToken(['User','Admin']), responseController.findDb);                     


//Other routes
responseRouter.post('/response', authJwt.verifyToken(['User','Admin']), responseController.addDb);
responseRouter.get('/response/:id', authJwt.verifyToken(['User','Admin']), responseController.findDbById);
responseRouter.delete('/response/:id', authJwt.verifyToken(['User','Admin']), responseController.deleteById);


module.exports=responseRouter;
