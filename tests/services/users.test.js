const userService = require('../../src/services/users');
const { User } = require('../../src/models');

describe('user services', () => {
    describe('createUser', () => {
        it('should return a user', async () => {
            jest.spyOn(User, 'create').mockResolvedValue({
                id: 1,
                email: 'email'
            });
            const response = await userService.createUser({
                email: 'email',
                password: 'password'
            });
            expect(response).toEqual({
                id: 1,
                email: 'email'
            });
        });
        it('should throw an error if email is not unique', async () => {
            jest.spyOn(User, 'create').mockRejectedValue({
                code: 400,
                message: 'email must be unique'
            });
            try{
                await userService.createUser({
                    email: 'email',
                    password: 'password'
                });
            }
            catch(err){
                expect(err).toEqual(
                    new Error('Email must be unique', 400)
                );
            }
        });
    });
});