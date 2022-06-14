import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../../components/customButton/CustomButton'
import CustomInput from '../../components/customInput/CustomInput'

export default function ForgotPasswordScreeen({navigation}) {

  const [email, setEmail] = useState('');

  const sendRequestResetPassword = () => {
    console.warn("send request");
  }

  const backToSignIn= () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Your Password</Text>
      <View style={styles.sub_container}>
        <Text style={styles.text}>Please enter the email you use to sign in:</Text>
        <CustomInput 
          placeholder={"Enter your email"}
          inputType='email-address'
          value={email}
          setValue={setEmail}/>
      </View>

      <CustomButton 
        text={"Request password reset"}
        bgColor={"#7f0e16"}
        onPress={sendRequestResetPassword}/>

      <CustomButton 
        text={"Back to sign in"}
        type={"TERTIARY"}
        onPress={backToSignIn}/>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    padding: 20,
    width: '100%',
  },
  sub_container:{
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  text:{

  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  }
})