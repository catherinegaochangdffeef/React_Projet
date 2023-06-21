import React, { useState } from 'react';
import { Button, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';

const MealPlanningScreen = ({ mealPlan }) => {
    console.log(mealPlan);
    const [fold, setFold] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const inverseFold = (day) => {
        setFold((prevFold) => ({
            ...prevFold,
            [day]: !prevFold[day],
        }));
    };

    return (
        <View>
            <ScrollView style={{ backgroundColor: '#b8e994' }}>
                <TouchableOpacity onPress={() => inverseFold('Monday')}>
                    <Text variant="h4" style={styles.titre}>
                        Monday
                    </Text>
                </TouchableOpacity>

                {fold['Monday'] && (
                    <View>
                        <Text>Breakfast</Text>
                        <Text>Lunch</Text>
                        <Text>Dinner</Text>
                        <Text>Snack</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Tuesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Tuesday
                    </Text>
                </TouchableOpacity>

                {fold['Tuesday'] && (
                    <View>
                        <Text>Breakfast</Text>
                        <Text>Lunch</Text>
                        <Text>Dinner</Text>
                        <Text>Snack</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Wednesday')}>
                    <Text variant="h4" style={styles.titre}>
                        Wednesday
                    </Text>
                </TouchableOpacity>

                {fold['Wednesday'] && (
                    <View>
                        <Text>Breakfast</Text>
                        <Text>Lunch</Text>
                        <Text>Dinner</Text>
                        <Text>Snack</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Thursday')}>
                    <Text variant="h4" style={styles.titre}>
                        Thursday
                    </Text>
                </TouchableOpacity>

                {fold['Thursday'] && (
                    <View>
                        <Text>Breakfast</Text>
                        <Text>Lunch</Text>
                        <Text>Dinner</Text>
                        <Text>Snack</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Friday')}>
                    <Text variant="h4" style={styles.titre}>
                        Friday
                    </Text>
                </TouchableOpacity>

                {fold['Friday'] && (
                    <View>
                        <Text>Breakfast</Text>
                        <Text>Lunch</Text>
                        <Text>Dinner</Text>
                        <Text>Snack</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Saturday')}>
                    <Text variant="h4" style={styles.titre}>
                        Saturday
                    </Text>
                </TouchableOpacity>

                {fold['Saturday'] && (
                    <View>
                        <Text>Monday</Text>
                        <Text>Lunch: Food item 1</Text>
                        <Text>Dinner: Food item 2</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => inverseFold('Sunday')}>
                    <Text variant="h4" style={styles.titre}>
                        Sunday
                    </Text>
                </TouchableOpacity>

                {fold['Sunday'] && (
                    <View>
                        <Text>Monday</Text>
                        <Text>Lunch: Food item 1</Text>
                        <Text>Dinner: Food item 2</Text>
                    </View>
                )}
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
