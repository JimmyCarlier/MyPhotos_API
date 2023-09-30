const { users } = require("../database/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secureYourConnect";

exports.signUp = (req, res) => {
  if (req.body.password === req.body.verifPassword) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      users
        .create({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hash,
          id_role: 2,
        })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          res.status(400).json({ message: error.message });
        });
    });
  } else {
    res.sendStatus(418);
  }
};

exports.signIn = (req, res) => {
  users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((isValid) => {
          if (isValid) {
            const token = jwt.sign(
              {
                data: user.email,
                user: user.firstname,
                role: user.id_role,
                firstname: user.firstname,
                lastname: user.lastname,
                id: user.id,
              },
              SECRET_KEY,
              { expiresIn: 60 * 60 }
            );
            res.status(200).json(token);
          } else {
            res.sendStatus(400);
          }
        })
        .catch(() => {
          res.sendStatus(401);
        });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.isConnect = (req, res, next) => {
  if (!req.headers.authorization) {
    res.sendStatus(400);
  } else {
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.decode(token);
    next();
  }
};
