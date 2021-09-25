var express = require('express');
var router = express.Router();
const controller = require('../controller/user')
const { authenticateToken } = require('../Auth/jwt')
//get user by id
router.get('/getUser/:id', authenticateToken, controller.getusersByid);

//sign
router.post('/sign', controller.createUsers);

//update
router.put('/update', authenticateToken, controller.updateUsers);

//delete
router.delete('/delete/:id', authenticateToken, controller.deleteusersByid);

//login
router.post('/logIn', controller.loginUser)

module.exports = router;
