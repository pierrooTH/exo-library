import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ListItem, SearchBar, Button } from 'react-native-elements';
import axios from 'axios';
import { block } from 'react-native-reanimated';

export default function LibraryScreen({navigation}) {
    const [content, setContent] = useState('');
    const [booksGoogle, setBooksGoogle] = useState([]);
    const apiKeyGoogle = 'AIzaSyDrjiMJ-65Msopt5U_b0bqCvVxM_4HICYQ';

    const myBooks = [
      {id: 1, title: "Harry PotD'fleur et sa braguette magmatique", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur eros ornare metus congue, fringilla. "},
      {id: 2, title: "Martine chez ta grand-mère", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur eros ornare metus congue, fringilla. "},
      {id: 3, title: "Titeuf aime le jaune (pastis)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur eros ornare metus congue, fringilla. "},
      {id: 4, title: "Le seigneur des anaux", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur eros ornare metus congue, fringilla. "},
      {id: 5, title: "Jul en Y", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur eros ornare metus congue, fringilla. "},
    ]

  const handleSubmit = () => {
    console.log(content);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${content}&key=${apiKeyGoogle}&maxResults=20`)
      .then(res => {
        console.log(res.data.items);
        setBooksGoogle(res.data.items);
      })
 
  }

  const renderItemMyBooks = ({ item }) => (
    <View style={ content !== '' ? styles.noDisplayContent : styles.displayContent}>
      <ListItem bottomDivider>
        <ListItem.Content style={styles.content}>
      <Text style={styles.books}>
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> 
        <ListItem.Title  style={styles.name}>
            {item.title}</ListItem.Title>
        </Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )

  const renderItem = ({ item }) => (
    <View >
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
    navigation.navigate("Détails d'un livre", {
      book: item,
    });
  }

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
        <FlatList 
            data={myBooks}
            renderItem={renderItemMyBooks}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
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
    fontFamily: 'Poppins'
  },
  btn: {
    justifyContent: 'center'
  },
  textSearchBar: {
    color: '#385fc2',
    fontFamily: 'Poppins'
  },
  noDisplayContent: {
    display: 'none'
  },
  displayContent: {
    display: 'flex'
  },
  
 

});
