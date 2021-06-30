import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ListItem } from 'react-native-elements';
import axios from 'axios';

export default function LibraryScreen({navigation}) {
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

  const renderItem = ({ item }) => (
    <View>
      <ListItem bottomDivider>
        <ListItem.Content style={styles.content}>
      <Text style={styles.books}>
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> 
        <ListItem.Title onPress={() => goToBookScreen(item)}  style={styles.name}>
            {item.volumeInfo.title}</ListItem.Title>
        </Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )

  function goToBookScreen(item) {
    navigation.navigate('Book', {
      book: item,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput style={styles.searchForm} value={content} onChangeText={(text) => {setContent(text)}} placeholder="nom du livre" />
      <Button title='OK' onPress={handleSubmit}/>
      </View>
      <FlatList 
          data={booksGoogle}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}

        />
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
    marginBottom: 10,
    marginTop: 20
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
