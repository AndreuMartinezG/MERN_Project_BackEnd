const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// AQUI VA EL CRUD de Users

//Registro
router.post('/', UsersController.userRegister);

//Traer todos los usuarios
router.get('/', UsersController.allUser)

//Borrar Usuarios
router.delete('/', UsersController.userDelete)

//Traer usuario por Id
router.get('/profile', UsersController.userProfile)

//New Followed
router.post('/followed', UsersController.userfollowed);

//Delete followed
router.delete('/followed', UsersController.userUnfollow);

//Login
router.post('/login', UsersController.userLogin)



module.exports = router