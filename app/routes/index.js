const express = require('express');
const router = express.Router();


const userRoutes = require('./user.routes');
const roleRouter = require('./role.routes');
const alertRouter = require('./alert.routes');
const responseRouter = require('./response.routes');

router.use('/users', userRoutes);
router.use('/roles', roleRouter);
router.use('/admin', alertRouter);
router.use('/users', responseRouter);





module.exports = router;