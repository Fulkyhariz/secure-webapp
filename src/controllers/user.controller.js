const { UserDTO } = require("../dtos/user.dto");
const db = require("../models");
const User = db.user;

exports.register = (req, res) => {

  const user = new UserDTO(req.body);

  User.create(user)
    .then((data) => {
      res.json({
        message: "User created successfully.",
        data: data.toJSON(),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the User.",
        data: null,
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json({
        message: "Users retrieved successfully.",
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users.",
        data: null,
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
