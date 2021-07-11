import React, {useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ListItem, SearchBar, Button } from 'react-native-elements';
import axios from 'axios';
import { useFonts } from 'expo-font';


export default function LibraryScreen({navigation}) {
    const [content, setContent] = useState('');
    const [booksGoogle, setBooksGoogle] = useState([]);
    const apiKeyGoogle = 'AIzaSyDrjiMJ-65Msopt5U_b0bqCvVxM_4HICYQ';
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    let [fontsLoaded] = useFonts({
      'Roboto-Regular': require('../assets/font/Roboto-Regular.ttf'),
      'Roboto-Bold': require('../assets/font/Roboto-Bold.ttf')
    })

  const handleSubmit = () => {
    console.log(content);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${content}&key=${apiKeyGoogle}&maxResults=20`)
      .then(res => {
        console.log(res.data.items);
        setBooksGoogle(res.data.items);
      })
 
  }

  const addBookToFavourite = (item) => {
    const newBooks = [...favoriteBooks, item];
    setFavoriteBooks(newBooks);
  }


  const renderItemFavoriteBooks = ({ item }) => (
    <View >
      <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      }
        rightContent={
          <Button
            title="Supprimer"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red'}}
            onPress={() => addBookToFavourite(item)}
          />
        }
      >
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> 
        <ListItem.Content style={styles.content}>
      <Text style={styles.books}>
        <ListItem.Title onPress={() => goToBookScreen(item)}  style={styles.name}>
            {item.volumeInfo.title}</ListItem.Title>
        </Text>
        </ListItem.Content>
        <ListItem.Chevron />
        </ListItem.Swipeable>
    </View>
  )

  const renderItem = ({ item }) => (
    <View >
      <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      }
        rightContent={
          <Button
            title="Ajouter"
            icon={{ name: 'add', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'lightgreen'}}
            onPress={() => addBookToFavourite(item)}
          />
        }
      >
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> 
        <ListItem.Content style={styles.content}>
      <Text style={styles.books}>
        <ListItem.Title onPress={() => goToBookScreen(item)}  style={styles.name}>
            {item.volumeInfo.title}</ListItem.Title>
        </Text>
        </ListItem.Content>
        <ListItem.Chevron />
        </ListItem.Swipeable>
    </View>
  )

  function goToBookScreen(item) {
    navigation.navigate("Détails d'un livre", {
      book: item,
    });
  }

  if(!fontsLoaded) {
    return <Text>Loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
        <SearchBar
          placeholder="Rechercher un livre"
          onChangeText={(text) => {setContent(text)}}
          value={content}
          lightTheme={true}
          containerStyle={styles.searchForm}
          round={true}
          inputStyle={styles.textSearchBar}
        />
        <Button containerStyle={styles.btn} title='OK' onPress={handleSubmit}/>
        </View>
        <Text style={styles.favorite}>Mes favoris</Text>
        <FlatList 
            data={favoriteBooks}
            renderItem={renderItemFavoriteBooks}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.favoriteList}
          />
        <FlatList 
            data={booksGoogle}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#385fc2',
    justifyContent: 'center',
  },
  searchForm: {
    width: '80%',
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
    justifyContent: 'center',
    fontFamily: 'Roboto-Bold'
  },
  btn: {
    justifyContent: 'center'
  },
  textSearchBar: {
    color: '#385fc2',
    fontFamily: 'Roboto-Bold'
  },
  noDisplayContent: {
    display: 'none'
  },
  displayContent: {
    display: 'flex'
  },
  favorite: {
    color: 'white', 
    fontSize: 25,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  favoriteList: {
    marginBottom: 20,
    height: '30%'
  },


 

});
