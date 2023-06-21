import React, { useState } from 'react';
import { Button, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';

const MealComponent = ({ mealName, foodItems }) => {
    console.log(mealName, foodItems);
    return (
        <View>
            <Text>{mealName}</Text>
            {foodItems.map((foodItem, index) => (
                <View key={index}>
                    <Text>{foodItem.food.label}</Text>
                </View>
            ))}
        </View>
    );
};
//  <Text>Quantity: {foodItem.quantity}</Text>
const DisplayInfo = ({ mealPlan, selectedDay }) => {
    const calculateTotalCalories = (foodItems) => {
        let totalCalories = 0;
        foodItems.forEach((item) => {
            totalCalories += item.food.nutrients.ENERC_KCAL * item.quantity;
        });
        return totalCalories;
    };
    const breakfastItems = mealPlan.Day.Breakfast.filter(
        (item) => item.SelectedDay === selectedDay
    );
    const lunchItems = mealPlan.Day.Lunch.filter((item) => item.SelectedDay === selectedDay);
    const snackItems = mealPlan.Day.Snack.filter((item) => item.SelectedDay === selectedDay);
    const dinnerItems = mealPlan.Day.Dinner.filter((item) => item.SelectedDay === selectedDay);

    const totalCalories =
        calculateTotalCalories(breakfastItems) +
        calculateTotalCalories(lunchItems) +
        calculateTotalCalories(snackItems) +
        calculateTotalCalories(dinnerItems);

    return (
        <View>
            <MealComponent
                mealName="Breakfast"
                foodItems={breakfastItems}
                selectedMealType="Breakfast"
            />
            <MealComponent mealName="Lunch" foodItems={lunchItems} selectedMealType="Lunch" />
            <MealComponent mealName="Snack" foodItems={snackItems} selectedMealType="Snack" />
            <MealComponent mealName="Dinner" foodItems={dinnerItems} selectedMealType="Dinner" />

            <Text>Total Calories: {totalCalories}</Text>
        </View>
    );
};

const MealPlanningScreen = ({ mealPlan }) => {
    console.log(mealPlan);
    const [selectedDay, setSelectedDay] = useState('');

    const [fold, setFold] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const handleTouchedDay = (day) => {
        setFold((prevFold) => {
            const updateFold = {};
            Object.keys(prevFold).forEach((key) => {
                updateFold[key] = key === day;
            });
            return updateFold;
        });
        setSelectedDay(day);
    };
    return (
        <View>
            <ScrollView style={{ backgroundColor: '#b8e994' }}>
                <TouchableOpacity onPress={() => handleTouchedDay('Monday')}>
                    <Text variant="h4" style={styles.titre}>
                        Monday
                    </Text>
                </TouchableOpacity>

                {fold['Monday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Tuesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Tuesday
                    </Text>
                </TouchableOpacity>

                {fold['Tuesday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Wednesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Wednesday
                    </Text>
                </TouchableOpacity>

                {fold['Wednesday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Thursday')}>
                    <Text variant="h4" style={styles.titre}>
                        Thursday
                    </Text>
                </TouchableOpacity>

                {fold['Thursday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Friday')}>
                    <Text variant="h4" style={styles.titre}>
                        Friday
                    </Text>
                </TouchableOpacity>

                {fold['Friday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Saturday')}>
                    <Text variant="h4" style={styles.titre}>
                        Saturday
                    </Text>
                </TouchableOpacity>

                {fold['Saturday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}

                <TouchableOpacity onPress={() => handleTouchedDay('Sunday')}>
                    <Text variant="h4" style={styles.titre}>
                        Sunday
                    </Text>
                </TouchableOpacity>

                {fold['Sunday'] && <DisplayInfo mealPlan={mealPlan} selectedDay={selectedDay} />}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    titre: {
        margin: 16,
        textAlign: 'center',
    },
});

export default MealPlanningScreen;
