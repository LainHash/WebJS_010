import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../../repos/user/userRepo.js";
import * as customerRepo from "../../repos/user/customerRepo.js";
import * as roleRepo from "../../repos/user/roleRepo.js";
import User from "../../models/user/User.js";
import Customer from "../../models/user/Customer.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1h";
const BCRYPT_SALT_ROUNDS = 10;

export const register = async (data) => {
  const {
    username,
    email,
    password,
    roleId = 1,
    isActive = true,
    ...customerFields
  } = data;

  const roleRow = await roleRepo.findById(roleId);
  if (!roleRow) {
    const err = new Error(`Role with id ${roleId} does not exist`);
    err.status = 400;
    throw err;
  }

  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error("Email is already registered");
    err.status = 400;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const now = new Date();

  const accountCode = await userRepo.generateAccountCode();

  const user = new User({
    code: accountCode,
    username,
    email,
    passwordHash,
    roleId,
    isActive,
    createdAt: now,
    updatedAt: now,
  });

  const errors = user.validate ? user.validate() : [];
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }

  const userId = await userRepo.create(user.toInsertParams());
  user.Id = userId;

  const customerCode = await customerRepo.generateCustomerCode();

  const customer = new Customer({
    code: customerCode,
    ...customerFields,
    accountId: userId,
    createdAt: now,
    updatedAt: now,
  });

  const custErrors = customer.validate ? customer.validate() : [];
  if (custErrors.length) {
    const err = new Error("Customer validation failed");
    err.status = 400;
    err.details = custErrors;
    throw err;
  }

  await customerRepo.create(customer.toInsertParams());

  return { user, customer };
};

export const login = async (email, password) => {
  const row = await userRepo.findByEmail(email);
  if (!row) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  const user = User.fromDb(row);
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  const match = await bcrypt.compare(password, user.PasswordHash);
  if (!match) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  if (!user.IsActive) {
    const err = new Error("Account is inactive");
    err.status = 403;
    throw err;
  }

  const payload = { id: user.Id, email: user.Email, roleId: user.RoleId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  return { user, token };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_) {
    return null;
  }
};
