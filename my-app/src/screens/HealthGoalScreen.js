import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

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
      <View style={styles.flexBox}>
        <Text style={styles.titre}>Age</Text>
        <Text style={styles.titre}>Gender</Text>
      </View>
      <View style={styles.flexBox}>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Picker style={styles.picker} selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>
      <View style={styles.flexBox}>
        <Text style={styles.titre}>Height</Text>
        <Text style={styles.titre}>Weight</Text>
      </View>
      <View style={styles.flexBox}>
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (cm)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.flexBox}>
        <Text style={styles.titre}>Activity Level</Text>
        <Text style={styles.titre}>Health Goal</Text>
      </View>
      <View style={styles.flexBox}>
        <Picker
          style={styles.picker}
          selectedValue={activityLevel}
          onValueChange={{ setActivityLevel }}>
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light Exercise" value="lightExercise" />
          <Picker.Item label="Moderate Exercise" value="moderateExercise" />
          <Picker.Item label="Heavy Exercise" value="heavyExercise" />
          <Picker.Item label="Extra Active" value="extraActive" />
        </Picker>
        <Picker style={styles.picker} selectedValue={healthGoal} onValueChange={setHealthGoal}>
          <Picker.Item label="Weight Loss" value="weightLoss" />
          <Picker.Item label="Weight Maintenance" value="weightMaintenance" />
          <Picker.Item label="Weight Gain" value="weightGain" />
        </Picker>
      </View>
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titre: {
    marginBottom: 20,
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
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  flexBoxPicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }

});
export default HealthGoalScreen;
