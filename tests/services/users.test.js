const userService = require('../../src/services/users');
const { User } = require('../../src/models');

describe('user services', () => {
    describe('createUser', () => {
        it('should return a user', async () => {
            jest.spyOn(User, 'create').mockResolvedValue({
                id: 1,
                username: 'username',
                email: 'email'
            });
            const response = await userService.createUser({
                username: 'username',
                email: 'email',
                password: 'password'
            });
            expect(response).toEqual({
                id: 1,
                username: 'username',
                email: 'email'
            });
        });
        it('should throw an error if username is not unique', async () => {
            jest.spyOn(User, 'create').mockRejectedValue({
                code: 400,
                message: 'Username must be unique'
            });
            try{
                await userService.createUser({
                    username: 'username',
                    email: 'email',
                    password: 'password'
                });
            }
            catch(err){
                expect(err).toEqual({
                    code: 400,
                    message: 'Username must be unique'
                });
            }
        });
    });
});