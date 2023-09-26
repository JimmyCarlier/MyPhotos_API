const { users } = require("../database/sequelize");
const bcrypt = require("bcrypt");

exports.updatePassword = (req, res) => {
  users
    .findByPk(req.user.id)
    .then((user) => {
      bcrypt
        .compare(req.body.actualPassword, user.password)
        .then((isValid) => {
          if (isValid) {
            if (req.body.newPassword === req.body.confirmPassword) {
              bcrypt
                .hash(req.body.newPassword, 10)
                .then((hash) => {
                  user.update({
                    password: hash,
                  });
                  res.sendStatus(200);
                })
                .catch(() => {
                  res.sendStatus(400);
                });
            }
          } else {
            res.status(405).json({
              message: "error",
            });
          }
        })
        .catch(() => {
          res.sendStatus(400);
        });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
