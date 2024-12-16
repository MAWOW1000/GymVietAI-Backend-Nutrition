const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.post('/create-nutrition-plan', nutritionController.createNutritionPlan);

module.exports = router;
