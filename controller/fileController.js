const { Op } = require("sequelize");
const { picture } = require("../database/sequelize");

const ADMIN = 1;

exports.uploadFile = (req, res) => {
  const myFiles = [...req.files];
  const myDescriptions = [...req.body.description];
  myFiles.map((el,i) => {
    picture
      .create({
        file: el.path,
        description: myDescriptions[i],
        vote: 0,
        status: "nonpublie",
        id_user: req.user.id,
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  });
};

exports.updateFile = (req, res) => {
  if (req.user.role != ADMIN) {
    res.sendStatus(401);
  }
  const updatePhotos = [...req.body.ids];
    picture
          .update({
            status: req.body.status,
          },
          {
            where : {
              id: {
                  [Op.in]: updatePhotos
              }                           
          }
        })
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(400);
          });
};

exports.publishedPicture = (req, res) => {
  picture
    .findAll()
    .then((photos) => {
      const allPhotos = [];
      photos.map((element) => {
        if (element.status === "publie") {
          allPhotos.push(element);
        }
      });
      res.status(200).json({
        data: allPhotos,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.unpublishedPicture = (req, res) => {
  if (req.user.role != ADMIN) {
    res.sendStatus(401);
  }
  picture
    .findAll({ where: { status: "nonpublie" } })
    .then((photos) => {
      res.status(200).json({
        data: photos,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.picturesOfUser = (req, res) => {
  picture
    .findAll({
      where: {
        id_user: req.user.id,
      },
    })
    .then((pictures) => {
      res.status(200).json({
        data: pictures,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.mostVoted = (req, res) => {
  picture
    .findAll({
      where: { status: "publie" },
    })
    .then((photos) => {
      const array = [];
      photos.sort(function (a, b) {
        return b.votes - a.votes;
      });
      for (i = 0; i < 5; i++) {
        array.push(photos[i]);
      }
      console.log(array);
      res.status(200).json({
        data: array,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
