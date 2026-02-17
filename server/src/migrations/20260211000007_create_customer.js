import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Customers", {
    CustomerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Accounts",
        key: "AccountId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    Lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: true,
    },
    Birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING(20),
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
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("Customers");
};
