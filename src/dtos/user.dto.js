
const bcrypt = require('bcryptjs');

class RegisterUserDTO {
    username;
    password;
    firstname;
    lastname;
    age;
    constructor(data){
        this.username = data.username;
        this.password = bcrypt.hashSync(data.password, 8);
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}

class LoginDTO {
    username;
    password;
    constructor(data){
        this.username = data.username;
        this.password = data.password;
    }
}

class UpdateUserDTO {
    firstname;
    lastname;
    age;
    constructor(data){
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}

module.exports = {RegisterUserDTO, LoginDTO, UpdateUserDTO}