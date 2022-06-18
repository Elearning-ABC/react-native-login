import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder, srt, inputType='default'}) => {
  const [borderColor, setBorderColor] = React.useState();
  return (
    <View style={styles.input_container}>
        <TextInput 
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={setValue}
          secureTextEntry={srt}
          keyboardType={inputType}  
          // onPressIn={setBorderColor("#7f0e16")}
          />
    </View>
  )
}

const styles = StyleSheet.create({
    input_container:{
        marginVertical: 5,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        // paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
    },

    input: {
        // color: 'black',
        // width: '100%',
        paddingVertical: 15,
    }
})

export default CustomInput