const jwt = require('jsonwebtoken');
const { User } = require('../models');
const redisUtils = require('../utils/redisUtils');
const HTTPError = require('../utils/errors/HTTPError');


const loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new HTTPError('User not found');
    }
    if (await user.validatePassword(password) === false) {
        throw new HTTPError('Password incorrect');
    }
    const { id } = user;
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' });
    const redisClient = await redisUtils.getRedisClient();
    redisClient.set(token, '1', {
        'EX': 3600
    });
    return token;
};
const verifyToken = async (token) => {
    const redisClient = await redisUtils.getRedisClient();
    const isToken = await redisClient.get(token);
    if (!isToken) {
        throw new HTTPError('Unauthorized');
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
};

module.exports = { verifyToken, loginUser };
