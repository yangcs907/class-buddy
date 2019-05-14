// Validation for creating assignment form inputs
const Validator = require('validator');
const isEmpty = require('./emptyCheck.js');

module.exports = function createvalidation(input) {
  let errors = {};

  input.assignmentName = !isEmpty(input.assignmentName) ? input.assignmentName: '';
  input.assignmentPoints = !isEmpty(input.assignmentPoints) ? input.assignmentPoints: '';
  input.assignmentDescription = !isEmpty(input.assignmentDescription) ? input.assignmentDescription: '';

  if (Validator.isEmpty(input.assignmentName)) {
    errors.assignmentName = 'Assignment name is required';
  }
  if (!Validator.isLength(input.assignmentName, { min: 5, max: 100})) {
    errors.assignmentName = 'Assignment name must be between 5 and 100 characters';
  }
  if (Validator.isEmpty(input.assignmentPoints)) {
    errors.assignmentPoints = 'Assignment points is required';
  }
  if (Validator.isEmpty(input.assignmentDescription)) {
    errors.assignmentDescription = 'Assignment body is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
