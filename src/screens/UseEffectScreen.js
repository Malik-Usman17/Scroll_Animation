import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Axios } from "axios";



const UseEffectScreen = ({navigation}) => {

  const [myName, setMyName] = useState('Malik Usman');
  const [data, setData] = useState('');
  const isFocused = useIsFocused();

  // console.log('FOCUESD:',isFocused)

  const geTDataFromApi = async () => {
    console.log('running')
    try {
      const apiRespone = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      // console.log('API RESPONSE:',await apiRespone.json())
      setData(await apiRespone.json())
    } 
    catch (error) {
      alert(error)
    }
  }

  const nextScreen = () => {
    console.log('Method running!!')
    setTimeout(() => {
      navigation.navigate('ScrollAnimation')
    }, 2000);
    // navigation.navigate('ScrollAnimation')
  }

  useEffect(() => {
    geTDataFromApi()
  }, [])

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <View style={styles.innerContainer}>

        <TextInput
          style={styles.inputField} 
          value={myName}
          onChangeText={setMyName}
        />

        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black', marginVertical: 15}}>{myName}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScrollAnimation')}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>Press It!!</Text>
        </TouchableOpacity>

      </View>
      
    </View>
  )    
}


const styles = StyleSheet.create({
  innerContainer:{
    backgroundColor: 'pink', 
    borderRadius: 10,
    width: '80%',
    padding: 15
  },
  inputField:{
    backgroundColor: 'white', 
    paddingHorizontal: 12, 
    borderRadius: 15, 
    width: '100%'
  },
  button:{
    backgroundColor: 'blue', 
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 10, 
    padding: 10
  }
});


export default UseEffectScreen;