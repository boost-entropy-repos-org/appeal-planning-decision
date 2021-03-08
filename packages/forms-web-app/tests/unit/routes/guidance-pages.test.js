const { get } = require('./router-mock');
const guidancePagesController = require('../../../src/controllers/guidance-pages');

describe('routes/guidance-pages', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/guidance-pages');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/before-you-appeal', guidancePagesController.getBeforeAppeal);
  });
});