const UserModel = require('../models/user.js');

class User {
    constructor(){

    }

    async createUser(user) {
        //user.password = await bcrypt.hash( user.password, 10 );
        return UserModel.create(user);
    }

}

let UsersController = new User();
module.exports = UsersController;


module.exports = UsersController;