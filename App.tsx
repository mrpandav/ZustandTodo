import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/TodoScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen';
import ApiTodoScreen from './src/screens/ApiTodoScreen';
import ApiOneScreen from './src/screens/ApiOneScreen';
import ApiTowScreen from './src/screens/ApiTowScreen';
import ApiThreeScreen from './src/screens/ApiThreeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ApiTodoScreen" component={ApiTodoScreen} />
        <Stack.Screen name="ApiOneScreen" component={ApiOneScreen} />
        <Stack.Screen name="ApiTowScreen" component={ApiTowScreen} />
        <Stack.Screen name='ApiThreeScreen' component={ApiThreeScreen}/>


        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
