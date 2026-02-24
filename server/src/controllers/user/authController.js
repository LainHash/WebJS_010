import * as authService from "../../services/user/authService.js";

import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, customer } = await authService.register(req.body);
    res.status(201).json({ user, customer });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, token } = await authService.login(
      req.body.email,
      req.body.password,
    );
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
