import React, {useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
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

  // fonction qui permet au clique du bouton de pouvoir rechercher un livre de l'API de Google
  const handleSubmit = () => {
    console.log(content);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${content}&key=${apiKeyGoogle}&maxResults=20`)
      .then(res => {
        console.log(res.data.items);
        setBooksGoogle(res.data.items);
      })
 
  }

  // Fonction qui permet d'ajouter un livre de l'API à un nouveau tableau des favoris
  const addBookToFavourite = (item) => {
    // ici, on ajoute tout ce qu'il y a dans le tableau des favoriteBooks et également on ajoute le paramètre item
    const newBooks = [...favoriteBooks, item];
    // on sauvgearde tout ça dans le tableau des favoriteBooks
    setFavoriteBooks(newBooks);
  }

  // fonction qui permet de supprimer un livre en particulier des favoris
  const deleteBook = (item) => {
    const newArrayBooks = favoriteBooks.filter(book => book.id !== item.id);
    setFavoriteBooks(newArrayBooks);
  }


  const renderItemFavoriteBooks = ({ item }) => (
    <View >
      <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
          onPress={() => goToBookScreen(item)}
        />
      }
        rightContent={
          <Button
            title="Supprimer"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red'}}
            onPress={() => deleteBook(item)}
          />
        }
      >
        <Image style={styles.img}  source={{uri: 'imageLinks' in item.volumeInfo ? item.volumeInfo.imageLinks.thumbnail : 'https://www.my-bourg.ch/wp-content/uploads/2018/11/noavailable.png' }}/>

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
          onPress={() => goToBookScreen(item)}
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
        
        <Image style={styles.img}  source={{uri: 'imageLinks' in item.volumeInfo ? item.volumeInfo.imageLinks.thumbnail : 'https://www.my-bourg.ch/wp-content/uploads/2018/11/noavailable.png' }}/>

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

  const goToBookScreen = (item) => {
    navigation.navigate("Détails d'un livre", {
      book: item,
    });
  }
  const goToFavoriteScreen = (booksGoogle) => {
    navigation.navigate("Mes livres", {
      book: booksGoogle
    })
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
  img: {
    width: 70,
    height: 100
  }
});
