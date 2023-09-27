const { cgu } = require("../database/sequelize");
const ADMIN = 1;

exports.getCgu = (req, res) => {
  cgu
    .findAll()
    .then((cgu) => {
      res.status(200).json({
        data: cgu[0].texte,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.updateCgu = (req, res) => {
  if (req.user.role != ADMIN) {
    res.sendStatus(401);
  }
  cgu
    .update({ texte: req.body.cgu }, { where: { id: 1 } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(400);
    });
};
