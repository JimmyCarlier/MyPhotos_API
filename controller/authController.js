const user = require("../database/sequelize");
const bcrypt = require("bcrypt");

const signUp = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    user
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
      .catch(() => {
        res.sendStatus(400);
      });
  });
};
