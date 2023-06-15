import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HealthGoalScreen from '../screens/HealthGoalScreen';
import FoodDataBaseScreen from '../screens/FoodDataBaseScreen';
import MealPlanningScreen from '../screens/MealPlanningScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="FoodDataBase">
                <Tab.Screen name="HealthGoal" component={HealthGoalScreen} />
                <Tab.Screen name="FoodDataBase" component={FoodDataBaseScreen} />
                <Tab.Screen name="MealPlanning" component={MealPlanningScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
