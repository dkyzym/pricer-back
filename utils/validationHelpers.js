import { ValidationError } from '#utils/errors.js';

export const checkEmptyField = (field, errorMessage) => {
  if (!field.trim()) {
    throw new ValidationError(errorMessage);
  }
};
