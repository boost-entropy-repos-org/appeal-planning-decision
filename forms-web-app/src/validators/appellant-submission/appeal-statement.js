const { body } = require('express-validator');

const rules = () => {
  return [
    body('does-not-include-sensitive-information')
      .notEmpty()
      .withMessage('Confirm that your statement does not include sensitive information')
      .bail()
      .equals('i-confirm'),
  ];
};

module.exports = {
  rules,
};
