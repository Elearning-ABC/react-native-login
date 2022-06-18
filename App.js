import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SignInScreen from './screens/signinscreen/SignInScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreeen from './screens/forgotPWscreen/ForgotPasswordScreeen';
import RegisterScreen from './screens/registerScreen/RegisterScreen';
import LoggedInScreen from './screens/loggedin/LoggedInScreen';
import LoadingScreen from './screens/loadingScreen/LoadingScreen';


const Stack = createNativeStackNavigator();

function Signinscreen({navigation}){
    return (<SignInScreen navigation={navigation}/>);
}

function Forgotpasswordscreen({navigation}){
    return (<ForgotPasswordScreeen navigation={navigation}/>);
}

function Registerscreen({navigation}){
    return (<RegisterScreen navigation={navigation}/>);
}

function Loggedinscreen({route, navigation}){
    return (<LoggedInScreen navigation={navigation} route={route}/>);
}
  
function App(){
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },[isLoading])
    
    if (isLoading) {
      return (<LoadingScreen/>);
    }

    return (
      <NavigationContainer style={styles.mainView}>
          <Stack.Navigator  initialRouteName={'SignInScreen'}>
            <Stack.Screen 
              name='SignInScreen'
              component={Signinscreen}
              options={{title: "Sign in",
                        headerShown: false}}
            />
            <Stack.Screen 
              name='ForgotPasswordScreen'
              component={Forgotpasswordscreen}
              options={{title: "Forgot password"}}
            />

          <Stack.Screen 
              name='RegisterScreen'
              component={Registerscreen}
              options={{title: "Join our community",}}
          />
          <Stack.Screen 
              name='LoggedInScreen'
              component={Loggedinscreen}
              options={{
                      headerShown: false,
                      }}
          />
          </Stack.Navigator>   
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  mainView:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FBFC'
  }
});

export default App;
