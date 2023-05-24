import React from 'react';
import { Button, View, Text } from 'react-native';

function ProfileScreen ({navigation}){
  return (
    <View>
      <Text>Welcome to the Profile Screen!</Text>
      <Button title="Go to Setting Screen" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default ProfileScreen;