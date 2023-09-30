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
            res.sendStatus(400);
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

exports.forgottenPassword = (req, res) => {
  users
    .findOne({ where: { email: req.body.email } })
    .then((account) => {
      if (!account) {
        res.sendStatus(401);
      } else {
        if (req.body.password === req.body.confirmPassword) {
          console.log(account);
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              account.update({
                password: hash,
              });
              res.sendStatus(200);
            })
            .catch(() => {
              res.sendStatus(400);
            });
        }
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
