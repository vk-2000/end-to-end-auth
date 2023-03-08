const express = require('express');
const authController = require('../controllers/auth');
const schemaValidation = require('../middlewares/schemaValidation');
const authSchema = require('../schemas/auth.schema');

const router = express.Router();

router.post('/token/validate', schemaValidation.tokenValidation(authSchema.validateToken), authController.verifyToken);
router.post('/login', schemaValidation.bodyValidation(authSchema.login), authController.loginUser);

module.exports = router;
