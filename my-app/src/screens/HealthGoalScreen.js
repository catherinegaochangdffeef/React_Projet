import { HStack, Button, TextInput } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';

function HealthGoalScreen({ navigation }) {
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('female');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [healthGoal, setHealthGoal] = useState('weightLoss');
    const [bMR, setBMR] = useState(0);

    const calculateBMR = () => {
        let calcul1;

        //Step 3: Calculating BMR Using the Harris-Benedict Equation
        if (gender === 'male') {
            calcul1 = 88.362 + 13.397 * weight + 4.799 * height - 5.6777 * age;
        } else {
            calcul1 = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
        }

        //Step 4: Adjusting BMR Based on Activity Level
        let calcul2;
        switch (activityLevel) {
            case 'sedentary':
                calcul2 = calcul1 * 1.2;
                break;
            case 'lightExercise':
                calcul2 = calcul1 * 1.375;
                break;
            case 'moderateExercise':
                calcul2 = calcul1 * 1.55;
                break;
            case 'heavyExercise':
                calcul2 = calcul1 * 1.725;
                break;
            case 'extraActive':
                calcul2 = calcul1 * 1.9;
                break;
        }
        // Step 5: Adjusting Caloric Intake Based on Health Goal
        if (healthGoal === 'weightLoss') {
            setBMR(calcul2 * 0.9);
        } else if (healthGoal === 'weightGain') {
            setBMR(calcul2 * 1.1);
        } else setBMR(calcul2);
    };

    const handleSave = () => {
        if (!age || !gender || !height || !weight || !activityLevel || !healthGoal) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        calculateBMR();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ backgroundColor: '#b8e994' }}>
                {/* age */}
                {bMR !== 0 && (
                    <Text style={styles.titre}>Daily caloric intake: {Math.round(bMR)}</Text>
                )}

                <TextInput
                    variant="outlined"
                    label="Age"
                    style={{ margin: 16 }}
                    value={age.toString()}
                    onChangeText={(newAge) => setAge(newAge)}
                    keyboardType="numeric"
                />
                {/* gender */}
                <Text style={styles.titre}>Gender</Text>
                <HStack center>
                    <Button
                        title="Female"
                        tintColor={gender === 'female' ? 'white' : 'black'}
                        onPress={() => setGender('female')}
                        color={gender === 'female' ? '#38ada9' : 'white'}
                        style={{ color: gender === 'female' ? '#38ada9' : '#F00' }}
                    />
                    <Button
                        title="Male"
                        color={gender === 'male' ? '#38ada9' : 'white'}
                        tintColor={gender === 'male' ? 'white' : 'black'}
                        onPress={() => setGender('male')}
                    />
                </HStack>
                {/* <Picker style={styles.picker} selectedValue={gender} onValueChange={setGender}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker> */}
                {/* Height and weight */}
                <TextInput
                    variant="outlined"
                    label="Height (cm)"
                    style={{ margin: 16 }}
                    value={height.toString()}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />

                <TextInput
                    variant="outlined"
                    label="Weight (kg)"
                    style={{ margin: 16 }}
                    value={weight.toString()}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />

                {/* activityLevel */}
                <Text style={styles.titre}>Activity Level</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={activityLevel}
                    onValueChange={(newActivityLevel) => setActivityLevel(newActivityLevel)}
                >
                    <Picker.Item label="Sedentary" value="sedentary" />
                    <Picker.Item label="Light Exercise" value="lightExercise" />
                    <Picker.Item label="Moderate Exercise" value="moderateExercise" />
                    <Picker.Item label="Heavy Exercise" value="heavyExercise" />
                    <Picker.Item label="Extra Active" value="extraActive" />
                </Picker>

                {/* healthGoal */}
                <Text style={styles.titre}>Health Goal</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={healthGoal}
                    onValueChange={(newHealthGoal) => setHealthGoal(newHealthGoal)}
                >
                    <Picker.Item label="Weight Loss" value="weightLoss" />
                    <Picker.Item label="Weight Maintenance" value="weightMaintenance" />
                    <Picker.Item label="Weight Gain" value="weightGain" />
                </Picker>

                <Button title="Save" onPress={handleSave} color="#38ada9" tintColor="white" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    titre: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 60,
        borderColor: 'gray',
        borderWidth: 1,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker: {
        borderColor: 'gray',
        borderWidth: 1,
        // height: 120,
        // width: 120,
        margin: 10,
    },
    flexBoxPicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
export default HealthGoalScreen;
