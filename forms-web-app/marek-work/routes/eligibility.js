const express = require('express');

const appealStatementController = require('../controllers/appeal-statement');
const eligibilityController = require('../controllers/eligibility');
const listedBuildingController = require('../controllers/listed-building');
const { decisionDateValidationRules, validator } = require('./validators/validator');
const {
  rules: listedBuildingValidationRules,
  validator: listedBuildingValidator,
} = require('./validators/listed-building');
const lpasController = require('../controllers/local-planning-authorities');

const router = express.Router();

/* GET eligibility no decision page. */
router.get('/no-decision', eligibilityController.getNoDecision);

/* GET eligibility decision date input page. */
router.get('/decision-date', eligibilityController.getDecisionDate);

router.post(
  '/decision-date',
  decisionDateValidationRules(),
  validator,
  eligibilityController.postDecisionDate
);

/* GET eligibility decision date out page. */
router.get('/decision-date-expired', eligibilityController.getDecisionDateExpired);

/* GET eligibility planning department page. */
router.get('/planning-department', lpasController.getPlanningDepartment);

router.get('/listed-out', listedBuildingController.getServiceNotAvailableForListedBuildings);
router.get('/listed-building', listedBuildingController.getListedBuilding);
router.post(
  '/listed-building',
  listedBuildingValidationRules(),
  listedBuildingValidator,
  listedBuildingController.postListedBuilding
);

router.get('/appeal-statement', appealStatementController.getAppealStatement);
router.post('/appeal-statement', appealStatementController.postAppealStatement);

module.exports = router;
