const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const taskListRouter = require('./task-list');
const accuracySubmissionRouter = require('./accuracy-submission');
const otherAppealsRouter = require('./other-appeals');
const placeholderRouter = require('./placeholder');
const extraConditionsRouter = require('./extra-conditions');
const developmentPlanRouter = require('./development-plan');

router.use(homeRouter);
router.use(taskListRouter);
router.use(accuracySubmissionRouter);
router.use(otherAppealsRouter);
router.use(placeholderRouter);
router.use(extraConditionsRouter);
router.use(developmentPlanRouter);

module.exports = router;
