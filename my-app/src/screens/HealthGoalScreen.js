import React from 'react';
import { Button, View, Text } from 'react-native';

function HealthGoalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Food Data Base"
        onPress={() =>
          navigation.navigate('FoodDataBase', {
            itemId: 86,
            otherParam: ' anything you want here',
          })
        }
      />
    </View>
  );
}

export default HealthGoalScreen;
