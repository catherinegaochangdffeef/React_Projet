import { Button, TextInput } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    FlatList,
    Modal,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const FoodDataBaseScreen = ({ mealPlan, setMealPlan }) => {
    const [search, setSearch] = useState('');
    const [foodData, setFoodData] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('Breakfast');
    const [quantity, setQuantity] = useState('');
    const [SelectedDay, setSelectedDay] = useState('Monday');

    const fetchFoodData = async () => {
        const apiKey = 'b2201f576c67507706164522d88c9bc6';
        const apiId = 'd181441a';
        const endPoint = 'https://api.edamam.com/api/food-database/v2/parser';
        try {
            const response = await axios.get(endPoint, {
                params: {
                    q: search,
                    app_key: apiKey,
                    app_id: apiId,
                    ingr: search,
                },
            });
            //check if no food found in the database
            if (response.data.hints.length === 0) {
                setFoodData([]);
                Alert.alert('No food found in the database.');
                return;
            }
            console.log(response.data);
            setFoodData(response.data.hints);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearchSubmit = () => {
        fetchFoodData();
    };
    const handleFoodSelection = (food) => {
        setSelectedFood(food);
        setModalVisible(true);
    };
    const handleAddToMealPlan = () => {
        if (!selectedFood || !quantity) {
            Alert.alert('Please select a food item and specify the quantity.');
            return;
        }
        const updatedMealPlan = { ...mealPlan };
        updatedMealPlan.Day[selectedMealType].push({
            food: selectedFood,
            quantity,
            SelectedDay,
        });

        setMealPlan(updatedMealPlan);
        setModalVisible(false);
        setSelectedFood(null);
        setSelectedMealType('Breakfast');
        setQuantity('');
        console.log('MealPlan', mealPlan);
    };
    const renderFoodItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => handleFoodSelection(item.food)}>
                <Text>{item.food.label}</Text>
                <Text>Calorie: {item.food.nutrients.ENERC_KCAL}</Text>
                <Text>Fat: {item.food.nutrients.FAT}</Text>
                <Text>Carbs: {item.food.nutrients.CHOCDF}</Text>
                <Text>Protein: {item.food.nutrients.PROCNT}</Text>
            </TouchableOpacity>
        </View>
    );
    const handleQuantityChange = (text) => {
        setQuantity(text);
        Keyboard.dismiss();
    };

    return (
        <View>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(newSearch) => setSearch(newSearch)}
                value={search}
                lightTheme="true"
            />
            <Button title="Submit" onPress={handleSearchSubmit} color="#38ada9" tintColor="white" />
            {/* <ScrollView style={{ backgroundColor: '#b8e994' }}> */}
            {foodData && (
                <View>
                    <FlatList data={foodData} renderItem={renderFoodItem} />
                    <Modal visible={modalVisible}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center', marginBottom: -30 }}>
                                <Text>{selectedFood?.label}</Text>
                                <Text>Calorie: {selectedFood?.nutrients.ENERC_KCAL}</Text>
                                <Text>Fat: {selectedFood?.nutrients.FAT}</Text>
                                <Text>Carbs: {selectedFood?.nutrients.CHOCDF}</Text>
                                <Text>Protein: {selectedFood?.nutrients.PROCNT}</Text>
                            </View>
                            <Picker
                                selectedValue={selectedMealType}
                                onValueChange={(value) => setSelectedMealType(value)}
                                style={{ marginBottom: 20 }}
                            >
                                <Picker.Item label="Breakfast" value="Breakfast" />
                                <Picker.Item label="Lunch" value="Lunch" />
                                <Picker.Item label="Snack" value="Snack" />
                                <Picker.Item label="Dinner" value="Dinner" />
                            </Picker>
                            <Picker
                                selectedValue={SelectedDay}
                                onValueChange={(value) => setSelectedDay(value)}
                                style={{ marginBottom: 20 }}
                            >
                                <Picker.Item label="Monday" value="Monday" />
                                <Picker.Item label="Tuesday" value="Tuesday" />
                                <Picker.Item label="Wednesday" value="Wednesday" />
                                <Picker.Item label="Thursday" value="Thursday" />
                                <Picker.Item label="Friday" value="Friday" />
                                <Picker.Item label="Saturday" value="Saturday" />
                                <Picker.Item label="Sunday" value="Sunday" />
                            </Picker>
                            <TextInput
                                variant="outlined"
                                label="Quantity"
                                value={quantity}
                                onChangeText={handleQuantityChange}
                                keyboardType="numeric"
                                style={{ marginBottom: 20 }}
                            />

                            <Button
                                title="Add to Meal Plan"
                                onPress={handleAddToMealPlan}
                                color="#38ada9"
                                tintColor="white"
                            />
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

export default FoodDataBaseScreen;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#b8e994',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    modalView: {
        marginTop: '30%',
        margin: 20,
        backgroundColor: '#b8e994',
        borderRadius: 20,
        padding: 35,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
