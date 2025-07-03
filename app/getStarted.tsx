import { useUser } from '@/context/UserContext';
import { calculateWaterRequirement } from '@/utils/calculateRequirement';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { images } from '../constants/images';
interface UserInfo{
  name:string,
  age:number,
  gender:string,
  height:number,
  weight:number,
  waterRequirement: number;
  mode:string

}
const GetStarted = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const {user,setUser,resetUser}=useUser();
  // const [retrive,setRetrive]=useState<UserInfo>();
  // const getdata=async()=>{
  //   const x= await AsyncStorage.getItem('UserData');
  //   const response=await JSON.parse(x);
  //   console.log(response);
  //   setRetrive(response)
  // }
  const handle = async() => {
    if (!name || !age || !height || !weight || !gender) {
      Alert.alert('Incomplete Info', 'Please fill in all fields.');
      return;
    }
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const requirement = calculateWaterRequirement(weightNum, gender, ageNum);

     const userData: UserInfo = {
      name,
      age: ageNum,
      gender,
      height: heightNum,
      weight: weightNum,
      waterRequirement: requirement,
      mode: 'auto', 
    };

   try{
          setUser(userData);
    // await AsyncStorage.setItem('UserData',JSON.stringify(userData));
          console.log("loged in success fully");
          router.replace("/(tabs)")

    }
    catch(error){
      console.log(error);
    }

  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{alignItems:'center'}}>
      <Image source={images.Aqua_time} style={styles.image} />
        </View>

      <Text style={styles.headline}>Welcome to the App</Text>
      <Text style={styles.smallhead}>Please enter the Details.</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.selectwrap}>
        <Picker
          placeholder='Select the gender'
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.selecter}
        >
          <Picker.Item label="Select the gender" value="" enabled={false} />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <TextInput
        label="Height"
        value={height}
        onChangeText={setHeight}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Weight"
        value={weight}
        onChangeText={setWeight}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" 
      onPress={handle}
      >
        Start Hydrating 💧
      </Button>
     
      


    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: 'center'
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  selecter: {
    color: '#333',
    backgroundColor: 'white',
    borderColor: '#000'

  }, selectwrap: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10
  },
  smallhead: {
    fontSize: 15,
    fontWeight: 300,
    textAlign: "left",
  },
  image:{
    height:100,
    width:100,
    resizeMode:'cover',
    borderColor:'blue',
    borderWidth:2,
    borderRadius:50,

  }

})
export default GetStarted;