const express = require('express');

const appealStatementController = require('../../controllers/appellant-submission/appeal-statement');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: appealStatementValidationRules,
} = require('../../validators/appellant-submission/appeal-statement');

const router = express.Router();

router.get('/appeal-statement', appealStatementController.getAppealStatement);
router.post(
  '/appeal-statement',
  appealStatementValidationRules(),
  validationErrorHandler,
  appealStatementController.postAppealStatement
);

module.exports = router;
