import { View, Text, StyleSheet, Image, ScrollView, BackHandler, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'

import CustomInput from '../../components/customInput/CustomInput'
import CustomButton from '../../components/customButton/CustomButton'
import Img from '../../assets/images/logo.png'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app'

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
        // const saveValue = (user) => {
        //     if (user.uid) {
        //         AsyncStorage.setItem('uid', user.uid);
        //         AsyncStorage.setItem('displayName', user.displayName);
        //         AsyncStorage.setItem('email', user.email);
        //         AsyncStorage.setItem('photoURL', user.photoURL);
        //         if (user.phoneNumber)
        //             AsyncStorage.setItem('phoneNumber', user.phoneNumber);
        //         else
        //             AsyncStorage.setItem('phoneNumber', "null");
        //         console.log('done');
        //     }
        //     else console.log("not done");
        // }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to quit?", 
                    [{
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "YES", 
                        onPress: () => BackHandler.exitApp()}
                    ]);
            return true;
        }; 
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();  
    }, []);

    GoogleSignin.configure({
        webClientId: '278758243478-uo6dg9ekbfmjh09opajrspev4ktmu32l.apps.googleusercontent.com',
        iosClientId: '278758243478-v3ugcqrsua6gtks5s62amul02ukb48c1.apps.googleusercontent.com',
    });

    const onSignInPressed = () => {
        if(email === '' && password === '') {
            Alert.alert('Enter details to signin!')
        } 
        else {
            setLoading(true);
                        auth()
                            .signInWithEmailAndPassword(email, password)
                            .then((res) => {
                                console.log(res)
                                console.log('User logged-in successfully!')
                                setEmail('');
                                setPassword('');
                                setLoading('');
                                navigation.navigate('LoggedInScreen',
                                {
                                    displayName: "re.user.displayName",
                                    email: email,
                                    photoURL: "re.user.photoURL",
                                    phoneNumber: "re.user.phoneNumber",
                                    uid: "re.user.uid"
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                if (error === 'auth/invalid-email') console.warn('invalid email');
                                if (error === 'auth/user-not-found' || error == 'auth/wrong-password') console.warn('account or password is incorrect');
                                if (error === 'auth/too-many-requests') console.warn('pls calm down, this is too many request');
                            })
        }
    }

    const onRegister = () => {
        navigation.navigate('RegisterScreen');
    }
        
    const onSignInWithGoogle = async () => {
        // Get the users ID token

        try{
            const { idToken } = await GoogleSignin.signIn();
            // // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log(2);
            // // Sign-in the user with the credential
            const user_sign_in = auth().signInWithCredential(googleCredential);
            console.log(3);
            user_sign_in.then(re => {
                                console.log(re.user);
                                if (re.user) {
                                    navigation.navigate('LoggedInScreen',
                                                        {   displayName: re.user.displayName,
                                                            email: re.user.email,
                                                            photoURL: re.user.photoURL,
                                                            phoneNumber: re.user.phoneNumber,
                                                            uid: re.user.uid
                                                        });
                                }
            })
        } catch (error){
            console.log("cancel");
        }   
    }
        
    const onSignInWithApple = async () => {
              // performs login request
            // const appleAuthRequestResponse = await appleAuth.performRequest({
            //     requestedOperation: appleAuth.Operation.LOGIN,
            //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            // });

            // // get current authentication state for user
            // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            // // use credentialState response to ensure the user is authenticated
            // if (credentialState === appleAuth.State.AUTHORIZED) {
            //     // user is authenticated
            // }
    }
        
    const onForgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image source={Img} style={styles.logo} resizeMode="contain"/>

                <View style={styles.input_container}>
                    <CustomInput placeholder="email" value={email} setValue={setEmail} srt={false}/>
                    <CustomInput placeholder="password" value={password} setValue={setPassword} srt={true}/>
                </View>

                <View style={styles.button_container}>
                    <CustomButton 
                        text={"Sign In"} 
                        onPress={onSignInPressed}
                        type="PRIMARY"
                        bgColor={"#7f0e16"}
                    />
                    <CustomButton 
                        text={"Forgot password?"} 
                        onPress={onForgotPassword}
                        type="TERTIARY"
                        fgColor={"#6a6a6a"}
                    />
                    <CustomButton 
                        text={"Sign In with Google"} 
                        onPress={onSignInWithGoogle}
                        bgColor={"#e2f1fd"}
                        fgColor={"#0b3e81"}
                    />
                    <CustomButton 
                        text={"Sign In with Apple"} 
                        onPress={onSignInWithApple}
                        bgColor={"#e1e1e1"}
                        fgColor={"#2b2b2b"}
                    />
                    <CustomButton 
                        text={"Don't have an account? Create one"} 
                        onPress={onRegister}
                        type="TERTIARY"
                        fgColor={"#6a6a6a"}
                    />
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