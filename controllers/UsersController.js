const UsersController = {};
const authConfig = require('../config/auth');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        //SERIA BUENA IDEA SOLICITAR COMPROBACION DE NO REPETIR NICK
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
};


// FUNCION PARA AÑADIR NUEVOS AMIGOS
UsersController.userFollowing = async (req, res) => {

    let _id = req.body._id

    let id_following = req.body.id_following
    let name_following = req.body.name_following
    let userName = req.body.userName

    // Enviar Mensaje al usuario que ya sigue a esa persona
    try {
        await User.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    following: {
                        "id_following": id_following,
                        "name_following": name_following,
                        "userName": userName
                    }
                }
            }
        )
        res.send("Has Comenzado a seguir a esta persona")

    } catch (error) {
        res.send(error)
    }
}


//LOGIN
UsersController.userLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        email: email
    }).then(Usuario => {

        if (!Usuario) {
            res.send("Usuario o contraseña inválido");

        } else {

            if (bcrypt.compareSync(password, Usuario.password)) { //COMPARA CONTRASEÑA INTRODUCIDA CON CONTRASEÑA GUARDADA, TRAS DESENCRIPTAR

                let token = jwt.sign({ user: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                Usuario.token = token
                res.json({
                    user: Usuario,
                    token: token,
                    loginSucces: true
                })

            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }
        };

    }).catch(error => {
        res.send(error);
    })

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