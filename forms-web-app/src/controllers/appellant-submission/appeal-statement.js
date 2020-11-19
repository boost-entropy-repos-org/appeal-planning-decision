const VIEW = {
  APPEAL_STATEMENT: 'appellant-submission/appeal-statement',
};

exports.getAppealStatement = (req, res) => {
  res.render(VIEW.APPEAL_STATEMENT);
};

exports.postAppealStatement = (req, res) => {
  console.log(`body`, req.body);
  console.log(`files`, req.files);

  const { body } = req;
  const { errors = {}, errorSummary = {} } = body;

  if (Object.keys(errors).length > 0) {
    res.render(VIEW.APPEAL_STATEMENT, {
      errors,
      errorSummary,
    });
    return;
  }

  if (body['does-not-include-sensitive-information'] === 'i-confirm') {
    res.redirect('/appellant-submission/supporting-documents');
    return;
  }

  res.redirect('/appellant-submission/appeal-statement');
};
