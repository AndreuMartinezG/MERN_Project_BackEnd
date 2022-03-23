const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// AQUI VA EL CRUD de Users

//Registro
router.post('/', UsersController.userRegister);


module.exports = router