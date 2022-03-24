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

//Traer a todos los usuarios
UsersController.allUser = async (req, res) => {

    try {

        await User.find()
            .then(data => {
                res.send(data)
            }).catch(error => {
                res.send(error)
            })

    } catch (error) {

        res.send(error)
    }
}

//Borrar un usuario
UsersController.userDelete = async (req, res) => {

    let _id = req.body._id

    try {
        

        await User.findByIdAndDelete({
            _id: _id
        })
            .then(userDelete => {
                console.log(userDelete);
                res.send(`El usuario con el nombre ${userDelete.firstName} ha sido eliminado`);
            }).catch(error =>{
                res.send(error)
            })

    } catch (error) {
        res.send(error);
    }
}

//Peril de usuario por ID
UsersController.userProfile = async (req, res) => {

    let _id = req.body._id

    try {

        User.findById({
            _id: _id
        }).then(data => {
            res.send(data)
        }).catch(error => {
            res.send(error)
        })

    } catch (error) {

        res.send(error)
    }
}

// FUNCION PARA AÑADIR NUEVOS AMIGOS
UsersController.userfollowed = async (req, res) => {

    let _id = req.body._id

    let id_followed = req.body.id_followed
    let name_followed = req.body.name_followed
    let userName_followed = req.body.userName_followed

    // Enviar Mensaje al usuario que ya sigue a esa persona
    try {
        await User.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    followed: {
                        "id_followed": id_followed,
                        "name_followed": name_followed,
                        "userName_followed": userName_followed
                    }
                }
            }
        )
        res.send("Has Comenzado a seguir a esta persona")

    } catch (error) {
        res.send(error)
    } 
}


//Unfollow user /////////////////////////////////////////////////POR TERMINAR ///////////////////////////
UsersController.userUnfollow = async (req, res) => {

    let _id = req.body._id
    let _id_followed = req.body._id_followed

    try {
        await User.findOne(
            { _id: _id })
        .then(userFind => {
            console.log(userFind.followed)

            userFind.followed.map(value => {
                console.log(value, "Soy valueeeeeeeeeeeeeeeee")
                value.findByIdAndDelete({
                    _id_followed: _id

                })
                    .then(userDelete => {

                        console.log(userDelete);
                        res.send(`El usuario con el nombre ha sido eliminado`);

                    })
                
                res.send("Has dejado de seguir a esta persona")
            })
        })

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





// let _id = req.body._id
// let id_followed = req.body.id_followed

// try {
//     await User.findOne(
//         { _id: _id })
//     .then(userFind => {

//         userFind.followed.map(value => {
//             console.log(value, "VALUEEEEEEEEEEEEEEEEEEEEEEE")
//             if (value.id_followed === (id_followed)){
//                 value.find()
                
//             }else{
//                 console.log("Nainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
//             }
//         })
//     })
    
//     res.send("Has dejado de seguir a esta persona")

// } catch (error) {
//     res.send(error)
// }


////////////////////////////////////////////////////////////////////////////////////////version 2 entra en el if ///////////////////////////


// try {
//     await User.findOne(
//         { _id: _id })
//     .then(userFind => {

//         userFind.followed.map(value => {
//             console.log(value, "VALUEEEEEEEEEEEEEEEEEEEEEEE")
//             if (value.id_followed === (id_followed)){
//                 console.log("entramossssssssssssssssssssssss")
//                 value.deleteOne()
//                 .then(res=>{
//                     console.log("entramos en el delete")
//                     res.send(res)
//                 }).catch(error => {
//                     res.send(error)
//                 })
                
//             }else{
//                 console.log("Nainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
//             }
//         })
//     })
    
//     res.send("Has dejado de seguir a esta persona")

// } catch (error) {
//     res.send(error)
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////
