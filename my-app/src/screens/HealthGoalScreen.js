import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { HStack, Button, TextInput } from '@react-native-material/core';

function HealthGoalScreen({ navigation }) {
    const [age, setAge] = useState(20);
    const [gender, setGender] = useState('female');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [healthGoal, setHealthGoal] = useState('');

    const handleSave = () => {
        if (!age || !gender || !height || !weight || !activityLevel || !healthGoal) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        // TODO: Implement logic to save the user's health goals

        // Reset the form
        setAge('');
        setGender('');
        setHeight('');
        setWeight('');
        setActivityLevel('');
        setHealthGoal('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ backgroundColor: '#b8e994' }}>
                {/* age */}

                <TextInput
                    variant="outlined"
                    label="Age"
                    style={{ margin: 16 }}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
                {/* gender */}
                <Text style={styles.titre}>Gender</Text>
                <HStack center>
                    <Button title="Female" color="#38ada9" tintColor="white" />
                    <Button title="Male" color="#38ada9" tintColor="white" />
                </HStack>
                {/* <Picker style={styles.picker} selectedValue={gender} onValueChange={setGender}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker> */}
                {/* Height and weight */}
                <TextInput
                    variant="outlined"
                    label="Height"
                    style={{ margin: 16 }}
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />

                <TextInput
                    variant="outlined"
                    label="Weight"
                    style={{ margin: 16 }}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />

                {/* activityLevel */}
                <Text style={styles.titre}>Activity Level</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={activityLevel}
                    onValueChange={{ setActivityLevel }}
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
                    onValueChange={setHealthGoal}
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
