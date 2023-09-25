module.exports = (sequelize, datatypes) => {
  return sequelize.define(
    "pictures",
    {
      id: {
        type: datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      file: {
        type: datatypes.STRING(250),
        allowNull: false,
      },
      description: {
        type: datatypes.STRING,
        allowNull: false,
      },
      votes: {
        type: datatypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: datatypes.STRING,
        allowNull: true,
      },
      id_user: {
        type: datatypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
