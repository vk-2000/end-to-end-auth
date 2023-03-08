const authServices = require('../../src/services/auth');
const { User } = require('../../src/models');
const redisUtils = require('../../src/utils/redisUtils');
const jwt = require('jsonwebtoken');

describe('auth services', () => {
    describe('loginUser', () => {
        it('should return a token', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                validatePassword: jest.fn().mockResolvedValue(true)
            });
            jest.spyOn(redisUtils, 'getRedisClient').mockResolvedValue({
                set: jest.fn().mockResolvedValue(true)
            });
            jest.spyOn(jwt, 'sign').mockReturnValue('token');
            const response = await authServices.loginUser('username', 'password');
            expect(response).toBe('token');
        });
        it('should throw an error if user not found', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);
            await expect(authServices.loginUser('username', 'password')).rejects.toThrow('User not found');
        });
        it('should throw an error if password is incorrect', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                validatePassword: jest.fn().mockResolvedValue(false)
            });
            await expect(authServices.loginUser('username', 'password')).rejects.toThrow('Password incorrect');
        });
    });
    describe('verifyToken', () => {
        it('should return the decoded token', async () => {
            jest.spyOn(redisUtils, 'getRedisClient').mockResolvedValue({
                get: jest.fn().mockResolvedValue('1')
            });
            jest.spyOn(jwt, 'verify').mockReturnValue({ id: 1 });
            const response = await authServices.verifyToken('token');
            expect(response).toEqual({ id: 1 });
        });
        it('should throw an error if token is not found', async () => {
            jest.spyOn(redisUtils, 'getRedisClient').mockResolvedValue({
                get: jest.fn().mockResolvedValue(null)
            });
            await expect(authServices.verifyToken('token')).rejects.toThrow('Unauthorized');
        });
    });
});
