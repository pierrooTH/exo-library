import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import { SearchBar } from 'react-native-elements';

export default function LibraryScreen() {
    const [content, setContent] = useState('');
    const [booksGoogle, setBooksGoogle] = useState([]);
    const apiKeyGoogle = 'AIzaSyDrjiMJ-65Msopt5U_b0bqCvVxM_4HICYQ';

  // useEffect(() => {
  //   axios.get('https://www.googleapis.com/books/v1/volumes?q='+content+'&key=AIzaSyDrjiMJ-65Msopt5U_b0bqCvVxM_4HICYQ&maxResults=40')
  //   .then(res => {
  //     console.log(res.data.items);
  //     setBooksGoogle(res.data.items);
  //   })
  // }, [])


  const handleSubmit = () => {
    console.log(content);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${content}&key=${apiKeyGoogle}&maxResults=20`)
      .then(res => {
        console.log(res.data.items);
        setBooksGoogle(res.data.items);
      })
  }

  const booksGoogleJSX = booksGoogle.map(book => {
    return (
      <View key={book.id} >
      <Text style={styles.books}>
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> <Text style={styles.name}>{book.volumeInfo.title}</Text>
      </Text>
      <Text style={styles.description}>{book.volumeInfo.description}</Text>
      </View>
  )})

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput style={styles.searchForm} value={content} onChangeText={(text) => {setContent(text)}} placeholder="nom du livre" />
      <Button title='OK' onPress={handleSubmit}/>
      </View>
      <ScrollView>
      {booksGoogleJSX}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  searchForm: {
    width: 300,
    borderColor: 'black',
    borderWidth: 2,
  },
  form: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  books: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  icon: {
    marginRight: 5
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  textDescription: {
    fontSize: 15,
    marginBottom: 10
  },
  description: {
    alignItems: 'center'
  }, 

});
