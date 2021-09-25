var express = require('express');
var router = express.Router();
const controller=require('../controller/admin')
const { authenticateToken } = require('../Auth/jwt')

router.get('/getUsers',authenticateToken, controller.getUsers);

router.delete('/deleteAll',authenticateToken, controller.deleteAlluser);

module.exports=router