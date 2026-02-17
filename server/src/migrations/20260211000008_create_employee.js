import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Employees", {
    EmployeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EmployeeCode: {
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
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    CIC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BusinessEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Position: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    HiredDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Salary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    ManagerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
        key: "EmployeeId",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    Status: {
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
  await queryInterface.dropTable("Employees");
};
