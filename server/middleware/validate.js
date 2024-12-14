import { AppError } from '../utils/errors.js';

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    next(new AppError('Validation error', 400, error));
  }
};