const { validationResult } = require('express-validator');
const { testExpressValidatorMiddleware } = require('../validation-middleware-helper');
const { rules } = require('../../../../src/validators/appellant-submission/appeal-statement');

describe('routes/validators/appellant-submission/appeal-statement', () => {
  describe('rules', () => {
    it('is configured with the expected rules', () => {
      const rule = rules()[0].builder.build();

      expect(rule.fields).toEqual(['does-not-include-sensitive-information']);
      expect(rule.locations).toEqual(['body']);
      expect(rule.optional).toBeFalsy();
      expect(rule.stack).toHaveLength(3);
      expect(rule.stack[0].message).toEqual(
        'Confirm that your statement does not include sensitive information'
      );
      expect(rule.stack[2].validator.name).toEqual('equals');
      expect(rule.stack[2].options).toEqual(['i-confirm']);
    });

    it('should have the expected number of configured rules', () => {
      expect(rules().length).toEqual(1);
    });
  });

  describe('validator', () => {
    [
      {
        title: 'undefined - empty',
        given: () => ({
          body: {},
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(1);
          expect(result.errors[0].location).toEqual('body');
          expect(result.errors[0].msg).toEqual(
            'Confirm that your statement does not include sensitive information'
          );
          expect(result.errors[0].param).toEqual('does-not-include-sensitive-information');
          expect(result.errors[0].value).toEqual(undefined);
        },
      },
      {
        title: 'invalid value for `does-not-include-sensitive-information` - fail',
        given: () => ({
          body: {
            'does-not-include-sensitive-information': 12,
          },
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(1);
          expect(result.errors[0].location).toEqual('body');
          expect(result.errors[0].msg).toEqual('Invalid value');
          expect(result.errors[0].param).toEqual('does-not-include-sensitive-information');
          expect(result.errors[0].value).toEqual(12);
        },
      },
      {
        title: 'valid value for `does-not-include-sensitive-information` - "i-confirm" - pass',
        given: () => ({
          body: {
            'does-not-include-sensitive-information': 'i-confirm',
          },
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(0);
        },
      },
    ].forEach(({ title, given, expected }) => {
      it(`should return the expected validation outcome - ${title}`, async () => {
        const mockReq = given();
        const mockRes = jest.fn();

        await testExpressValidatorMiddleware(mockReq, mockRes, rules());
        const result = validationResult(mockReq);
        expected(result);
      });
    });
  });
});
