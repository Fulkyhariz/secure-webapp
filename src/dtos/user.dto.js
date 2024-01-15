class UserDTO {
    username;
    password;
    firstname;
    lastname;
    age;
    constructor(data){
        this.username = data.username;
        this.password = data.password;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}

module.exports = {UserDTO}