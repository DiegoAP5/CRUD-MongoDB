var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);

router.route('/user/search').get(userController.searchUserByEmailControllerFunc);

router.route('/user/delete').delete(userController.deleteUserByEmailControllerFunc);

router.route('/user/update/:email').put(userController.updateUserByEmailControllerFunc);

module.exports = router;
