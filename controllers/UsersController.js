const UsersController = {};
const { User } = require('../models/user.js');
const bcrypt = require('bcrypt');

//Registro de usuarios
UsersController.userRegister = async (req, res) => {

    //Registrando un usuario
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.edad;
    let email = req.body.email;
    let userName = req.body.userName;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
 

    //Comprobación de errores.....
    User.findAll({
        where: { email: email }
    }).then(datosRepetidos => {
        if (datosRepetidos == 0) {
            Usuario.create({
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                userName: userName,
                password: password,
            }).then(user => {
                res.send(`${user.firstName}, Has sido registrado con exito`);
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });
    //Guardamos en sequelize el usuario



};



module.exports = UsersController;