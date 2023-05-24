import React from 'react';
import { Button, View, Text } from 'react-native';

function FoodDataBaseScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View>
      <Text>Welcome to the Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title="Go to Meal Planning" onPress={() => navigation.navigate('MealPlanning')} />
    </View>
  );
}

export default FoodDataBaseScreen;
