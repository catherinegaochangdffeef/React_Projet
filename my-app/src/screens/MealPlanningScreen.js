import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Text } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MealComponent = ({ mealName, foodItems, onRemoveFood }) => {
    console.log(mealName, foodItems);
    const handleRemove = (index) => {
        onRemoveFood(mealName, index);
    };
    return (
        <View>
            <Text>{mealName}</Text>
            {foodItems.map((foodItem, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <Text>{foodItem.food.label}</Text>
                    <TouchableOpacity onPress={() => handleRemove(index)}>
                        <FontAwesome name="minus-square-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const DisplayInfo = ({ mealPlan, selectedDay, onRemoveFood }) => {
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
                onRemoveFood={onRemoveFood}
            />
            <MealComponent
                mealName="Lunch"
                foodItems={lunchItems}
                selectedMealType="Lunch"
                onRemoveFood={onRemoveFood}
            />
            <MealComponent
                mealName="Snack"
                foodItems={snackItems}
                selectedMealType="Snack"
                onRemoveFood={onRemoveFood}
            />
            <MealComponent
                mealName="Dinner"
                foodItems={dinnerItems}
                selectedMealType="Dinner"
                onRemoveFood={onRemoveFood}
            />

            <Text>Total Calories: {totalCalories}</Text>
        </View>
    );
};

const MealPlanningScreen = ({ mealPlan, navigation, setMealPlan }) => {
    console.log(mealPlan);
    const [selectedDay, setSelectedDay] = useState('Monday');

    const [fold, setFold] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });
    useEffect(() => {
        saveMealPlan();
    }, [mealPlan, selectedDay]);

    useEffect(() => {
        return () => {
            saveMealPlan();
        };
    }, []);
    useEffect(() => {
        loadMealPlan();
    }, []);
    const handleIconPress = () => {
        navigation.navigate('FoodDataBase');
    };
    const handleTouchedDay = (day) => {
        setFold((prevFold) => {
            const updateFold = {};
            Object.keys(prevFold).forEach((key) => {
                updateFold[key] = key === day ? !prevFold[key] : false;
            });
            return updateFold;
        });
        setSelectedDay(day);
    };
    const handleRemoveItem = (mealName, index) => {
        if (!selectedDay || !mealName || !mealPlan || !mealPlan.Day || !mealPlan.Day[mealName]) {
            console.log('Oh no');
            console.log(
                'selectedDay',
                selectedDay,
                'mealName',
                mealName,
                'mealPlan',
                mealPlan,
                'mealPlan.Day',
                mealPlan.Day,
                'mealPlan.Day[selectedDay]',
                mealPlan.Day[selectedDay]
            );
            return;
        }

        const updatedMealPlan = { ...mealPlan };
        const selectedMealDay = updatedMealPlan.Day[mealName];

        if (!selectedMealDay || !Array.isArray(selectedMealDay)) {
            console.log('Oh');
            return;
        }

        selectedMealDay.splice(index, 1);
        setMealPlan(updatedMealPlan);
    };
    const saveMealPlan = async () => {
        try {
            await AsyncStorage.setItem('mealPlan', JSON.stringify(mealPlan));
            console.log('Meal plan saved successfully!');
        } catch (error) {
            console.error('Error saving meal plan:', error);
        }
    };
    const loadMealPlan = async () => {
        try {
            const savedMealPlan = await AsyncStorage.getItem('mealPlan');
            if (savedMealPlan) {
                setMealPlan(JSON.parse(savedMealPlan));
                console.log('Meal plan loaded successfully!');
            }
        } catch (error) {
            console.error('Error loading meal plan:', error);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity onPress={() => handleTouchedDay('Monday')}>
                    <Text variant="h4" style={styles.titre}>
                        Monday
                    </Text>
                </TouchableOpacity>

                {fold['Monday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Tuesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Tuesday
                    </Text>
                </TouchableOpacity>

                {fold['Tuesday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Wednesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Wednesday
                    </Text>
                </TouchableOpacity>

                {fold['Wednesday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Thursday')}>
                    <Text variant="h4" style={styles.titre}>
                        Thursday
                    </Text>
                </TouchableOpacity>

                {fold['Thursday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Friday')}>
                    <Text variant="h4" style={styles.titre}>
                        Friday
                    </Text>
                </TouchableOpacity>

                {fold['Friday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Saturday')}>
                    <Text variant="h4" style={styles.titre}>
                        Saturday
                    </Text>
                </TouchableOpacity>

                {fold['Saturday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}

                <TouchableOpacity onPress={() => handleTouchedDay('Sunday')}>
                    <Text variant="h4" style={styles.titre}>
                        Sunday
                    </Text>
                </TouchableOpacity>

                {fold['Sunday'] && (
                    <DisplayInfo
                        mealPlan={mealPlan}
                        selectedDay={selectedDay}
                        onRemoveFood={handleRemoveItem}
                    />
                )}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Ionicons name="add-circle" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    titre: {
        margin: 16,
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#b8e994',
    },
});

export default MealPlanningScreen;
