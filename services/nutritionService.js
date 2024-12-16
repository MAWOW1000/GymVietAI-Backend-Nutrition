const axios = require('axios');
const NutritionPlan = require('../models/nutritionPlan');

class NutritionService {
    async generateNutritionPlan(userData) {
        const response = await axios.post('http://127.0.0.1:5001/api/nutrition-plan', userData);
        
        if (response.data.EC !== 0) {
            throw new Error(response.data.EM);
        }

        const { macro_targets, weekly_plan } = response.data.DT;
        const { macro_targets: planMetadataMacroTargets, ...restPlanMetadata } = weekly_plan.plan_metadata;

        const nutritionPlanData = {
            plan_id: new Date().getTime().toString(),
            macro_targets: {
                calories: macro_targets.calories,
                carbs: macro_targets.carbs,
                fat: macro_targets.fat,
                protein: macro_targets.protein
            },
            weekly_plan: {
                plan_metadata: restPlanMetadata,
                daily_plans: weekly_plan.daily_plans
            }
        };

        const nutritionPlan = new NutritionPlan(nutritionPlanData);
        return await nutritionPlan.save();
    }
}

module.exports = new NutritionService();
