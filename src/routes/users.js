const express = require('express');
const usersController = require('../controllers/users');
const schemaValidation = require('../middlewares/schemaValidation');
const userSchema = require('../schemas/user.schema');


const router = express.Router();

router.post('/',schemaValidation.bodyValidation(userSchema.create), usersController.createUser);

module.exports = router;
