const userController = require('../../src/controllers/users');
const usersService = require('../../src/services/users');

describe('User Controller', () => {
    describe('createUser', () => {
        it('should create a user', async () => {
            jest.spyOn(usersService, 'createUser').mockResolvedValue({ id: 1, email: 'email' });
            const req = {
                body: {
                    email: 'email',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await userController.createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it('should return 400 if email is not unique', async () => {
            jest.spyOn(usersService, 'createUser').mockRejectedValue({ code: 400, message: 'email must be unique' });
            const req = {
                body: {
                    email: 'email',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await userController.createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: 'email must be unique' });
        });
    });
});