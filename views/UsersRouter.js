const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// AQUI VA EL CRUD de Users

//Registro
router.post('/', UsersController.userRegister);


//Borrar Usuarios
router.delete('/', UsersController.userDelete)

//New Follow // FUNCION PARA AÑADIR NUEVOS AMIGOS
router.post('/followed', UsersController.userfollowed);

//Login
router.post('/login', UsersController.userLogin)



module.exports = router