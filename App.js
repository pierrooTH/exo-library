import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function App() {
  const [content, setContent] = useState('');
  let books = [
    {id: 1, name: 'Harry Potter et sa braguette magmatique'},
    {id: 2, name: 'Martine chez ta grand mère'},
    {id: 3, name: "La chatte de l'archiduchesse"},
    {id: 4, name: "Pierre à l'âge de Pierre"},
    {id: 5, name: 'Martine à la plage'},
    {id: 6, name: "50 nuances de schnek"},
    {id: 7, name: 'Harry Potter et sa bite magique'}
  ];
  const [booksFiltered, setBooksFiltered] = useState([...books]);

  
  // const filteredBooks = books.filter(book => {
  //   return book.name.toLowerCase().includes(content.toLowerCase())
  // })


  const booksFilteredJSX = booksFiltered.map(book => {
    return (
      <Text key={book.id} style={styles.books}>
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> {book.name}
      </Text>
  )})

// au clic du bouton filtrer le nom des livres par rapport
// au contenu de la recherche 
// le tout en minuscule
  const handleSubmit = () => {
    setBooksFiltered(books.filter(book => {
      return book.name.toLowerCase().includes(content.toLowerCase())
    }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.library}>Ma bibliothèque</Text>
      <View style={styles.form}>
      <TextInput style={styles.searchForm} value={content} onChangeText={(text) => {setContent(text)}} placeholder="nom du livre" />
      <Button title='OK' onPress={handleSubmit}/>
      </View>
      {booksFilteredJSX}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  library: {
    fontWeight: 'bold',
    fontSize: 25
  },
  searchForm: {
    width: 200,
    borderColor: 'black',
    borderWidth: 2
  },
  form: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  books: {
    flexDirection: 'row',
    margin: 10
  },
  icon: {
    marginRight: 5
  }
});
