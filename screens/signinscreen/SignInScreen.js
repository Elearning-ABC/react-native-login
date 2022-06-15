import { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../../components/customInput/CustomInput'
import CustomButton from '../../components/customButton/CustomButton'
import Img from '../../assets/images/logo.png'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}) => {

        GoogleSignin.configure({
            webClientId: '278758243478-uo6dg9ekbfmjh09opajrspev4ktmu32l.apps.googleusercontent.com',
            iosClientId: '278758243478-v3ugcqrsua6gtks5s62amul02ukb48c1.apps.googleusercontent.com',
            // 
        });

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const onSignInPressed = () => {
            console.warn("sigin in");
        }

        const onRegister = () => {
            navigation.navigate('RegisterScreen');
        }
        
        const onSignInWithGoogle = async () => {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
            // // Sign-in the user with the credential
            const user_sign_in = auth().signInWithCredential(googleCredential);
        
            user_sign_in.then(re=>{
            console.log(re.user);
                if (re.user.uid) {
                    navigation.navigate('LoggedInScreen',{
                                                        displayName: re.user.displayName,
                                                        email: re.user.email,
                                                        phoneNumber: re.user.phoneNumber,
                                                        uid: re.user.uid
                                                    });
                }
            })
        }
        
        
        const onSignInWithApple = async () => {
            console.warn("apple")
        }
        
        const onForgotPassword = () => {
            navigation.navigate('ForgotPasswordScreen');
        }


        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={Img} style={styles.logo} resizeMode="contain"/>
                    <View style={styles.input_container}>
                        <CustomInput placeholder="username" value={username} setValue={setUsername} srt={false}/>
                        <CustomInput placeholder="password" value={password} setValue={setPassword} srt={true}/>
                    </View>
                    <View style={styles.button_container}>
                        <CustomButton 
                            text={"Sign In"} 
                            onPress={onSignInPressed}
                            type="PRIMARY"
                            bgColor={"#7f0e16"}/>
                        <CustomButton 
                            text={"Forgot password?"} 
                            onPress={onForgotPassword}
                            type="TERTIARY"
                            fgColor={"#6a6a6a"}/>
                        <CustomButton 
                            text={"Sign In with Google"} 
                            onPress={onSignInWithGoogle}
                            bgColor={"#e2f1fd"}
                            fgColor={"#3b71f3"}/>
                        <CustomButton 
                            text={"Sign In with Apple"} 
                            onPress={onSignInWithApple}
                            bgColor={"#e1e1e1"}
                            fgColor={"#2b2b2b"}/>
                        <CustomButton 
                            text={"Don't have an account? Create one"} 
                            onPress={onRegister}
                            type="TERTIARY"
                            fgColor={"#6a6a6a"}/>
                    </View>                    
                </View>
                
            </ScrollView>
        )
}

export default SignInScreen

const styles = StyleSheet.create({
    container :{
        paddingHorizontal: 20,
        width: '100%',
        paddingTop: 60,
        alignItems: 'center',
    },
    input_container:{
        width:'100%',
        marginTop: 30,
    },
    button_container:{
        width:'100%',
        marginTop: 10,
    },
    logo: {
        width: 180,
        height: 120,
    }
})