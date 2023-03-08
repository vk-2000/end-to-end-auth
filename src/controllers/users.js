const usersService = require('../services/users');

const createUser = async (req, res) => {
    const user = req.body;
    try{
        const createdUser = await usersService.createUser(user);
        res.status(201).send(createdUser);
    }
    catch(err){
        res.status(err.code).send({message: err.message});
    }
};

module.exports = { createUser };
