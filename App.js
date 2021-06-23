import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function App() {
  const [content, setContent] = useState('');
  let books = [
    {id: 1, name: 'Harry Potter et sa braguette magmatique', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 2, name: 'Martine chez ta grand mère', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 3, name: "La chatte de l'archiduchesse", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 4, name: "Pierre à l'âge de Pierre", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 5, name: 'Martine à la plage', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 6, name: "50 nuances de schnek", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'},
    {id: 7, name: 'Harry Potter et sa bite magique', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate.'}
  ];
  const [booksFiltered, setBooksFiltered] = useState([...books]);

  
  // const filteredBooks = books.filter(book => {
  //   return book.name.toLowerCase().includes(content.toLowerCase())
  // })


  const booksFilteredJSX = booksFiltered.map(book => {
    return (
      <View>
      <Text key={book.id} style={styles.books}>
        <AntDesign style={styles.icon} name="book" size={24} color="black" /> <Text style={styles.name}>{book.name}</Text>
      </Text>
      <View style={styles.description}>
        <Text style={styles.textDescription}>{book.description}</Text>
      </View>
      </View>
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
      <View style={styles.title}>
      <Text style={styles.library}>Ma bibliothèque</Text>
      </View>
      <View style={styles.form}>
      <TextInput style={styles.searchForm} value={content} onChangeText={(text) => {setContent(text)}} placeholder="nom du livre" />
      <Button title='OK' onPress={handleSubmit}/>
      </View>
      <ScrollView>
      {booksFilteredJSX}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor:'lightsteelblue'
  },
  library: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  title: {
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: 20,
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
