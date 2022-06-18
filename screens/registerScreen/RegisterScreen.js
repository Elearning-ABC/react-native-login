import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../../components/customButton/CustomButton'
import CustomInput from '../../components/customInput/CustomInput'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export default function RegisterScreen({navigation}) {
    const [password, setPassword] = useState('');
    const [verifyPW, setVerifyPW] = useState('');
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const verify = () => {
        if (!password || !verifyPW || !name || !email){
            console.warn("You must fill in (*)");
        }

        else if (password != verifyPW){
            console.warn("Your password is not match!");
        }

        else {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created!');
                    navigation.goBack();
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    }
                    console.error(error);
                });
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.input_container}>
                    <View style={styles.sub_container}>
                        <Text>Email(*):</Text>
                        <CustomInput 
                            placeholder={"email"}
                            value={email}
                            inputType={'email-address'}
                            setValue={setemail}/>
                    </View>     
                    <View style={styles.sub_container}>
                        <Text>Password(*):</Text>
                        <CustomInput 
                            placeholder={"password"}
                            value={password}
                            srt={true}
                            setValue={setPassword}/>
                    </View>
                    <View style={styles.sub_container}>
                        <Text>Verify Password(*):</Text>
                        <CustomInput 
                            placeholder={"verify password"}
                            value={verifyPW}
                            srt={true}
                            setValue={setVerifyPW}/>
                    </View>
                    <View style={styles.sub_container}>
                        <Text>Name(*):</Text>
                        <CustomInput 
                            placeholder={"your name"}
                            value={name}
                            setValue={setName}/>
                    </View>
                    <View style={styles.sub_container}>
                        <Text>Phone Number:</Text>
                        <CustomInput 
                            placeholder={"phonenumber"}
                            value={phonenumber}
                            inputType={'phone-pad'}
                            setValue={setPhonenumber}/>
                    </View>           
                </View>
                <CustomButton 
                    text={"Register"}
                    bgColor={"#7f0e16"}
                    onPress={verify}/>
            </View>            
        </ScrollView>

  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    input_container:{
        width: '100%',
        marginTop: 20,
    },  
    sub_container:{
        width: '100%',
        alignItems: 'flex-start'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})