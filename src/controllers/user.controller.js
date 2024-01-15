const { RegisterUserDTO, LoginDTO } = require("../dtos/user.dto");
const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/jwt.config');

exports.register = (req, res) => {

  const user = new RegisterUserDTO(req.body);

  User.create(user)
    .then((data) => {
      res.json({
        message: "User created successfully.",
        data: data.toJSON(),
      });
    })
    .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'username already taken'});
          } else {
            console.error(err);
            res.status(500).json({ error: 'internal server error' });
          }
    });
};

exports.login = async (req, res) => {
  const userDTO = new LoginDTO(req.body);
  await User.findOne({
    where: {
        username: userDTO.username,
    },
  })
    .then((user) => {
        if (!user) {
            return res.status(401).json({
                accessToken: null,
                refreshToken: null,
                message: "inavlid username or password"
            });
        }

        var passwordIsValid = bcrypt.compareSync(userDTO.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                refreshToken: null,
                message: "inavlid username or password"
            });
        }

        var accessToken = 'Bearer ' + jwt.sign({
            id: user.id
        }, jwtConfig.jwtAccessSecret, {
            expiresIn: jwtConfig.jwtAccessExpiry
        });

        var refreshToken = 'Bearer ' + jwt.sign({
            id: user.id
        }, jwtConfig.jwtRefreshSecret, {
            expiresIn: jwtConfig.jwtRefreshExpiry
        });

        res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }).catch(err => {
        console.error(err)
        res.status(500).send({
            accessToken: null,
            refreshToken: null,
            message: "internal server error",
        });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "User updated successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while updating the user.",
        data: null,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "User deleted successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting the user.",
        data: null,
      });
    });
};

exports.findOne = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.json({
        message: "User retrieved successfully.",
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving user.",
        data: null,
      });
    });
};
