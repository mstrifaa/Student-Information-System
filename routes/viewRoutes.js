const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedin);

router
  .get('/', viewController.getHomepage)
  .get('/Login', viewController.getLogin)
  .get('/Signup', viewController.getSignup);

router
  .get('/dashboard', authController.protect, viewController.getDashboard)
  .get('/results', authController.protect, viewController.getResult)
  .get('/profile', authController.protect, viewController.getProfile)
  .get('/course_reg', authController.protect, viewController.getCourseReg)
  .get(
    '/change_password',
    authController.protect,
    viewController.changePassword
  );

module.exports = router;
