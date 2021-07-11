import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import { useFonts } from 'expo-font';

export default function SplashScreen({navigation}) {

  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/font/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/font/Roboto-Bold.ttf')
  })

    function goToLibrary() {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Rechercher un livre',
            }
          ]
        })
      }

      if(!fontsLoaded) {
        return <Text>Loading...</Text>
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Book'App</Text>
            <Image style={styles.imgLibrary} source={require('../assets/img/logo-library.png')}/>

            <Button onPress={() => goToLibrary()} title="Commencer" />
        </View>
    )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  '#385fc2',
        justifyContent: 'center',
        alignItems: 'center'
      },
    imgLibrary: {
        width: 300,
        height: 300,
        margin: 20
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold', 
      fontFamily: 'Roboto-Bold',
      color: 'white',
      margin: 20,
    }
})