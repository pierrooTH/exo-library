import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'


export default function BookScreen({route}) {
    const book = route.params.book

    return (
            <View>
                    <View key={book.id} style={styles.list}>
                    <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Image style={styles.img}  source={{uri: book.volumeInfo.readingModes.image  ? book.volumeInfo.imageLinks.thumbnail : 'https://www.my-bourg.ch/wp-content/uploads/2018/11/noavailable.png' }}/>
                    <Text style={styles.bookName}>{book.volumeInfo.title}</Text>
                    <Text style={styles.author}>{book.volumeInfo.readingModes.text ? book.volumeInfo.authors[0] : 'Auteur inconnu'}</Text>
                    <Text style={styles.description}>{book.volumeInfo.description}</Text>
                    <Text style={styles.date}>Date de parution: {book.volumeInfo.publishedDate}</Text>
                    </ScrollView>
                    </View>
                        
            </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
    },
    description: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 15
    },
    bookName: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
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
    author: {
        alignSelf: 'flex-end',
        marginRight: 20,
        fontSize: 20,
        marginBottom: 15
    },
    date: {
        alignSelf: 'center',
        fontSize: 17,
        margin: 20
    }
    


});