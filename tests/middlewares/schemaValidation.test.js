const { tokenValidation, bodyValidation } = require('../../src/middlewares/schemaValidation');

describe('schemaValidation', () => {
    describe('tokenValidation', () => {
        it('should send response with status code 401 when token is not valid', async () => {
            const req = {
                headers: {
                    authorization: undefined
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockReturnValue({ error: 'error' })
            };
            await tokenValidation(schema)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);

        });
        it('should call next when token is valid', async () => {
            const req = {
                headers: {
                    authorization: 'token'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockReturnValue({ error: undefined })
            };
            await tokenValidation(schema)(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it('should send response with status code 500 when an error occurs', async () => {
            const req = {
                headers: {
                    authorization: 'token'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockImplementation(() => { throw new Error('error'); })
            };
            await tokenValidation(schema)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    describe('bodyValidation', () => {
        it('should send response with status code 400 when body is not valid', async () => {
            const req = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockReturnValue({ error: 'error' })
            };
            await bodyValidation(schema)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        it('should call next when body is valid', async () => {
            const req = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockReturnValue({ error: undefined })
            };
            await bodyValidation(schema)(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it('should send response with status code 500 when an error occurs', async () => {
            const req = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const schema = {
                validate: jest.fn().mockImplementation(() => { throw new Error('error'); })
            };
            await bodyValidation(schema)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
        }
        );
    });
});