const express = require('express');

const decisionDateController = require('../../controllers/eligibility/decision-date');
const fetchExistingAppealMiddleware = require('../../middleware/fetch-existing-appeal');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: decisionDateValidationRules,
} = require('../../validators/eligibility/decision-date');

const router = express.Router();

/* GET eligibility no decision page. */
router.get('/no-decision', decisionDateController.getNoDecision);

/* GET eligibility decision date input page. */
router.get(
  '/decision-date',
  [fetchExistingAppealMiddleware],
  decisionDateController.getDecisionDate
);

router.post(
  '/decision-date',
  [fetchExistingAppealMiddleware],
  decisionDateValidationRules(),
  validationErrorHandler,
  decisionDateController.postDecisionDate
);

/* GET eligibility decision date out page. */
router.get(
  '/decision-date-passed',
  [fetchExistingAppealMiddleware],
  decisionDateController.getDecisionDatePassed
);

module.exports = router;