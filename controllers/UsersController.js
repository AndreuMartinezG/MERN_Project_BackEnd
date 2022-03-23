const UsersController = {};
const authConfig = require('../config/auth');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');

//Registro de usuarios
UsersController.userRegister = async (req, res) => {

    //Registrando un usuario
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let birthday = req.body.birthday;
    let email = req.body.email;
    let userName = req.body.userName;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));


    //Comprobación de errores.....
    User.find({
        email: email
    }).then(datosRepetidos => {

        if (datosRepetidos == false) {
            
            User.create({
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
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




UsersController.userFollow = async (req, res) => {


    let _id = req.body._id

    let id_follower = req.body.id_follower

    // Enviar Mensaje al usuario que ya sigue a esa persona
    try {
        console.log("entramos aqui")
        User.findOneAndUpdate(
            { _id: _id},
            {
                $push: {
                    followers: {
                        "_id": _id,
                        "id_follower": id_follower
                    }
                }
            }
            
        )
        console.log("PasamosPush")
        res.send("Correcto")

    } catch (error) {
        res.send(error)
    }



}




module.exports = UsersController;









// User.find({
//     _id: _id
// }).then(userFind => {
//     if ("623b59aa3f4be1962d582f5f" === "623b59aa3f4be1962d582f5f") {

//         console.log("entramos if")
//         try{
//             console.log("Entramos a update")
//             User.followers.updateOne(
//                 { _id: _id },
//                 { $push: [{ id_follower: id_follower}] },
//                 res.send("Hemos pasado el update")
//             );

//         }catch(error){
//             res.send(error)
//         }

//     } else {
//         res.send("la id del usuario a seguir no existe");
//     }

// }).catch(error => {
//     res.send(error)
// });