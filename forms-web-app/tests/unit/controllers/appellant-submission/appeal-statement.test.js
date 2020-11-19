const appealStatementController = require('../../../../src/controllers/appellant-submission/appeal-statement');
const { mockReq, mockRes } = require('../../mocks');

const req = mockReq();
const res = mockRes();

describe('controller/appellant-submission/appeal-statement', () => {
  describe('getAppealStatement', () => {
    it('should call the correct template', () => {
      appealStatementController.getAppealStatement(req, res);

      expect(res.render).toHaveBeenCalledWith('appellant-submission/appeal-statement');
    });
  });

  describe('postAppealStatement', () => {
    it('should re-render the template with errors if submission validation fails', async () => {
      const mockRequest = {
        ...req,
        body: {
          errors: { a: 'b' },
          errorSummary: { a: { msg: 'There were errors here' } },
        },
      };
      await appealStatementController.postAppealStatement(mockRequest, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('appellant-submission/appeal-statement', {
        errorSummary: { a: { msg: 'There were errors here' } },
        errors: { a: 'b' },
      });
    });

    it('should redirect back to `/appellant-submission/appeal-statement` if validation passes but `i-confirm` not given', async () => {
      const mockRequest = {
        ...req,
        body: {
          'does-not-include-sensitive-information': 'anything here - not valid',
        },
      };
      appealStatementController.postAppealStatement(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith('/appellant-submission/appeal-statement');
    });

    it('should redirect to `/appellant-submission/supporting-documents` if valid', async () => {
      const mockRequest = {
        ...req,
        body: {
          'does-not-include-sensitive-information': 'i-confirm',
        },
      };
      await appealStatementController.postAppealStatement(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith('/appellant-submission/supporting-documents');
    });
  });
});
