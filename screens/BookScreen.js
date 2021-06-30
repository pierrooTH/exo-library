import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function BookScreen({route}) {
    const book = route.params.book
    return (
                <Card>
                <Card.Title style={styles.bookName}>{book.volumeInfo.title}</Card.Title>
                <Card.Divider/>
                
                        <View key={book.id} style={styles.list}>
                        <ScrollView>
                        <Image style={styles.img}  source={{ uri: book.volumeInfo.imageLinks.thumbnail}}/>
                        <Text style={styles.description}>{book.volumeInfo.description}</Text>
                        </ScrollView>
                        </View>
                        
                </Card>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
    },
    description: {
        fontSize: 17,
        marginTop: 15,
        marginBottom: 15
    },
    bookName: {
        fontSize: 22
    },
    list: {
        padding: 15,
    },
    img: {
        width: 200,
        height: 300,
        alignSelf: 'center',
        margin: 15
    },
    


});