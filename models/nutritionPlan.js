const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    food_name: String,
    portion_grams: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
});

const mealSchema = new mongoose.Schema({
    meal_type: String,
    foods: [foodSchema],
    total_calories: Number,
    total_protein: Number,
    total_carbs: Number,
    total_fat: Number
});

const dailyPlanSchema = new mongoose.Schema({
    date: Date,
    meals: {
        breakfast: mealSchema,
        lunch: mealSchema,
        dinner: mealSchema,
        snack: mealSchema
    },
    daily_totals: {
        calories: Number,
        carbs: Number,
        fat: Number,
        protein: Number
    }
});

const nutritionPlanSchema = new mongoose.Schema({
    plan_id: String,
    macro_targets: {
        calories: Number,
        carbs: Number,
        fat: Number,
        protein: Number
    },
    weekly_plan: {
        plan_metadata: {
            allergens: [String],
            dietary_restrictions: [String],
            end_date: Date,
            generated_at: Date,
            start_date: Date
        },
        daily_plans: {
            Monday: dailyPlanSchema,
            Tuesday: dailyPlanSchema,
            Wednesday: dailyPlanSchema,
            Thursday: dailyPlanSchema,
            Friday: dailyPlanSchema,
            Saturday: dailyPlanSchema,
            Sunday: dailyPlanSchema
        }
    }
}, {
    collection: 'nutrition_plans'
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);
