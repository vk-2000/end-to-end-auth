const authController = require('../../src/controllers/auth');
const authService = require('../../src/services/auth');

describe('Auth Controller', () => {
    describe('loginUser', () => {
        it('should return a token', async () => {
            jest.spyOn(authService, 'loginUser').mockResolvedValue('token');
            const req = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await authController.loginUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it('should return an error', async () => {
            jest.spyOn(authService, 'loginUser').mockRejectedValue(new Error('error'));
            const req = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await authController.loginUser(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });
    });
    describe('verifyToken', () => {
        it('should return a valid token', async () => {
            jest.spyOn(authService, 'verifyToken').mockResolvedValue({ id: 1, username: 'username' });
            const req = {
                headers: {
                    authorization: 'token'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await authController.verifyToken(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it('should return an invalid token', async () => {
            jest.spyOn(authService, 'verifyToken').mockRejectedValue(new Error('error'));
            const req = {
                headers: {
                    authorization: 'token'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await authController.verifyToken(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });
    });
});