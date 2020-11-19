const VIEW = {
  SUPPORTING_DOCUMENTS: 'appellant-submission/supporting-documents',
};

exports.getSupportingDocuments = (req, res) => {
  res.render(VIEW.SUPPORTING_DOCUMENTS);
};
