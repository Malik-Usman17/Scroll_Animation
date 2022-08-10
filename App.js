import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ScrollAnimation from './src/screens/ScrollAnimation';
import UseEffectScreen from './src/screens/UseEffectScreen';


const { Screen, Navigator } = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='UseEffectScreen' screenOptions={{headerShown: false}}>
        <Screen name='ScrollAnimation' component={ScrollAnimation}/>
        <Screen name='UseEffectScreen' component={UseEffectScreen}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default App;