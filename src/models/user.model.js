const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.password;
        delete values.updatedAt;
        delete values.createdAt;
        return values;
    }

    return User;
}
