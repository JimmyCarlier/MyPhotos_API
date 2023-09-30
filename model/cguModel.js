module.exports = (sequelize, datatypes) => {
  return sequelize.define("cgu", {
    id: {
      type: datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texte: datatypes.TEXT,
  });
};
