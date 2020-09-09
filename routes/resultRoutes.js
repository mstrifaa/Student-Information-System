const express = require('express');
const resultController = require('./../controllers/resultController');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, resultController.getAllResults)
  .post(
    authController.protect,
    userController.getStudentId,
    authController.restrictTo('admin'),
    resultController.createResult
  );

module.exports = router;
