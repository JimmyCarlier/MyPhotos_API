// Import package
const { Sequelize, Model, DataTypes } = require("sequelize");
const usersModel = require("../model/usersModel");
const roleModel = require("../model/roleModel");
const pictureModel = require("../model/pictureModel");
const bcrypt = require("bcrypt");

// Connection sequelize with database
const sequelize = new Sequelize("myphotos", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

// Try connection to database
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("La connection à bien était établis");
  } catch (error) {
    console.error("Erreur de connection : ", error);
  }
}
testConnection();

// Call table model
const users = usersModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);
const picture = pictureModel(sequelize, DataTypes);

// Add data when create database
const initData = sequelize.sync({}).then(() => {
  // bcrypt.hash("poupiDu1995R2", 10).then((hash) => {
  //   users.create({
  //     email: "test@admin.fr",
  //     firstname: "Jimmy",
  //     lastname: "Carlier",
  //     password: hash,
  //     id_role: 1,
  //   });
  // });
  // role
  //   .create({
  //     roleName: "Admin",
  //   })
  //   .then(() => {
  //     role.create({
  //       roleName: "Membre",
  //     });
  //   });
});

// Export model for CRUD create
module.exports = {
  sequelize,
  initData,
  users,
  role,
  picture,
};
