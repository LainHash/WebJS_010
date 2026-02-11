import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Accounts", {
    AccountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AccountCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "RoleId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("Accounts");
};
