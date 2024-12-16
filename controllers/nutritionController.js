const nutritionService = require('../services/nutritionService');

class NutritionController {
    async createNutritionPlan(req, res) {
        try {
            const { Weight, Height, Age, Gender, Goal, ActivityLevel, restrictions, allergens } = req.body;
            
            const userData = {
                Weight,
                Height,
                Age,
                Gender,
                Goal,
                ActivityLevel,
                restrictions,
                allergens
            };

            const savedPlan = await nutritionService.generateNutritionPlan(userData);

            return res.status(200).json({
                EC: 0,
                EM: 'Nutrition plan generated and saved successfully',
                DT: savedPlan
            });
        } catch (error) {
            console.error('Error generating nutrition plan:', error);
            res.status(500).json({
                EC: -1,
                EM: 'Error generating nutrition plan',
                DT: null
            });
        }
    }
}

module.exports = new NutritionController();
