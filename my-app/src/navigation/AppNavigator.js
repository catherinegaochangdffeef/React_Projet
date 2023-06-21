import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import FoodDataBaseScreen from '../screens/FoodDataBaseScreen';
import HealthGoalScreen from '../screens/HealthGoalScreen';
import MealPlanningScreen from '../screens/MealPlanningScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const [mealPlan, setMealPlan] = useState({
        Day: {
            Breakfast: [],
            Lunch: [],
            Snack: [],
            Dinner: [],
        },
    });
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="FoodDataBase">
                <Tab.Screen name="HealthGoal" component={HealthGoalScreen} />
                <Tab.Screen name="FoodDataBase">
                    {(props) => (
                        <FoodDataBaseScreen
                            {...props}
                            mealPlan={mealPlan}
                            setMealPlan={setMealPlan}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen name="MealPlanning">
                    {(props) => <MealPlanningScreen {...props} mealPlan={mealPlan} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
