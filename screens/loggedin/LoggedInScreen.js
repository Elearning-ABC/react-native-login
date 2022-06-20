import { StyleSheet, Text, View, BackHandler, Alert, Image } from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react'
import CustomButton from '../../components/customButton/CustomButton'
import AsyncSrtorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import LoadingScreen from '../loadingScreen/LoadingScreen'

const LoggedInScreen = ({route, navigation}) => {

    const {displayName, email, photoURL, phoneNumber, uid} = route.params
    const [isLoadingData, setLoadingData] = useState(false);

    // const {uids} = route.params;

    // const [uid, setUid] = useState('');
    // const [email, setEmail] = useState('');
    // const [photoURL, setPhotoURL] = useState('.');
    // const [displayName, setDisplayName] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');

    // AsyncSrtorage.getItem('uid').then((value) => {setUid(value)});
    // AsyncSrtorage.getItem('email').then((value) => {setEmail(value)});
    // AsyncSrtorage.getItem('phoneNumber').then((value) => {setPhoneNumber(value)});
    // AsyncSrtorage.getItem('displayName').then((value) => {setDisplayName(value)});
    // AsyncSrtorage.getItem('photoURL').then((value) => {setPhotoURL(value)});

    useEffect(()=>{
      setTimeout(() => {
        setLoadingData(true);
      }, 1000);
    },[])

    useEffect(() => {
      const backAction = () => {
        Alert.alert("!","Are you sure you want to log out?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            { text: "YES", onPress: () => {
                                            auth()
                                                .signOut()
                                                .then(() => {
                                                  GoogleSignin.signOut();
                                                  navigation.goBack();
                                                  console.log('User signed out!')
                                                });
                                            }}
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);

    const log_out = () => {
      Alert.alert("!",
                  "Are you sure you want to log out?", 
                  [{text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "YES", onPress: () => {
                                                  auth()
                                                      .signOut()
                                                      .then(() => {
                                                        GoogleSignin.signOut();
                                                        navigation.goBack();
                                                        console.log('User signed out!')
                                                      });
                                                  }
                    }
                  ]);
    }

    if (!isLoadingData) {
      return <LoadingScreen/>
    }
    
  return (
    <View style={styles.container}>
      <Image style={styles.photo}
            source={{uri: photoURL?photoURL : "."}}
            />
      <Text>Display name: {displayName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone number: {phoneNumber ? phoneNumber : "null"}</Text>
      <Text>uid: {uid}</Text>
      <CustomButton 
          text={"Log out"}
          type={"TERTIARY"}
          onPress={log_out}
      />
    </View>
  )
}

export default LoggedInScreen

const styles = StyleSheet.create({
  container:{
    width:'100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  photo:{
    width: 160,
    height: 160,
    borderRadius: 80,
  }
})