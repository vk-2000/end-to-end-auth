const { User } = require('../models');
const HTTPError = require('../utils/errors/HTTPError');

const createUser = async (user) => {
    try{
        const createdUser = await User.create(user);
        return { id: createdUser.id, username: createdUser.username, email: createdUser.email };
    }
    catch(err){
        throw new HTTPError('Username must be unique', 400);
    }
    
};

module.exports = { createUser };
