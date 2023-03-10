const { User } = require('../models');
const HTTPError = require('../utils/errors/HTTPError');

const createUser = async (user) => {
    try{
        const createdUser = await User.create(user);
        return { id: createdUser.id, email: createdUser.email };
    }
    catch(err){
        throw new HTTPError('Email must be unique', 400);
    }
    
};

module.exports = { createUser };
