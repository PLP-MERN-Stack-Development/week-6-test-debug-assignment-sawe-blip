// authMiddleware.test.js

const authMiddleware = require('../../src/middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Mock JWT
jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  const mockReq = () => ({
    headers: { authorization: 'Bearer validtoken' },
  });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const next = jest.fn();

  it('should call next if token is valid', () => {
    const req = mockReq();
    const res = mockRes();
    jwt.verify.mockReturnValue({ id: 'user123' });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET);
    expect(req.user).toEqual({ id: 'user123' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if token is missing', () => {
    const req = { headers: {} };
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const req = mockReq();
    const res = mockRes();
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
