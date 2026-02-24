import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Roles", {
    RoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RoleCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    RoleName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });

  // insert a baseline role so that roleId=1 is always valid for new users
  // (this will run only on a fresh database).  Applications can add more
  // roles later via their own administration UI.
  await queryInterface.bulkInsert(
    "Roles",
    [
      {
        RoleCode: "CUSTOMER",
        RoleName: "Customer",
        Description: "Default role assigned to new accounts",
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
    ],
    {},
  );
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("Roles");
};
