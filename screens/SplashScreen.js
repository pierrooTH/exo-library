import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';

export default function SplashScreen({navigation}) {

    function goToLibrary() {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Library',
            }
          ]
        })
      }
    return (
        <View style={styles.container}>
            <Image style={styles.imgLibrary} source={require('../assets/img/logo-library.png')}/>

            <Button onPress={() => goToLibrary()} title="Commencer" type="outline"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      },
    imgLibrary: {
        width: 300,
        height: 300,
    },
    
})