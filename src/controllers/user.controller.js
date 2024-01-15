const { RegisterUserDTO, LoginDTO, UpdateUserDTO } = require("../dtos/user.dto");
const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/jwt.config');

exports.register = async (req, res) => {

  const user = new RegisterUserDTO(req.body);

  await User.create(user)
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
                message: "inavlid username or password"
            });
        }

        var passwordIsValid = bcrypt.compareSync(userDTO.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
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
        res.status(500).json({
            message: "internal server error",
        });
    });
};

exports.token = async (req, res) => {

    await User.findByPk(req.user.id)
      .then((user) => {
          if (!user) {
              return res.status(404).json({
                  accessToken: null,
                  refreshToken: null,
                  message: "user not found"
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
          res.status(500).json({
              accessToken: null,
              refreshToken: null,
              message: "internal server error",
          });
      });
  };

exports.update = async (req, res) => {
  const id = req.user.id;
  const userDTO = new UpdateUserDTO(req.body);

  const user = await User.findByPk(req.user.id)
  console.log(user)

  await User.update(userDTO, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "User updated successfully.",
          data: user.toJSON(),
        });
      } else {
        res.json({
          message: `Cannot update user with id=${id}`,
        });
      }
    })
    .catch((err) => {
        console.error(err)
      res.status(500).json({
        message: err.message || "Some error occurred while updating the user.",
      });
    });
};

exports.findOne = async (req, res) => {
  await User.findByPk(req.user.id)
    .then((user) => {
      res.json({
        data: user.toJSON(),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving user.",
        data: null,
      });
    });
};
