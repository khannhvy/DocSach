import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';

const App = ({ navigation }) => {
  const [categoriesWithBooks, setCategoriesWithBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooksAndCategories = async () => {
    try {
       //wifi
      // const booksResponse = await axios.get('http://192.168.1.83:3000/books');
      // const categoriesResponse = await axios.get('http://192.168.1.83:3000/categories');


      //4g
      const booksResponse = await axios.get('http://192.168.105.58:3000/books');
      const categoriesResponse = await axios.get('http://192.168.105.58:3000/categories');

      const books = booksResponse.data;
      const categories = categoriesResponse.data;

      const categoriesWithBooks = categories.map(category => {
        return {
          ...category,
          books: books.filter(book => book.category === category.id)
        };
      });

      setCategoriesWithBooks(categoriesWithBooks);
      setFeaturedBooks(books.slice(0, 10)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksAndCategories();
  }, []);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <FlatList
        data={item.books}
        renderItem={renderBook}
        keyExtractor={book => book.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderBook = ({ item, isFeatured }) => (
    <View style={styles.bookItem}>
      <Image
        source={{ uri: `http://192.168.1.83:3000/${item.coverImage}` }}
        style={isFeatured ? styles.featuredBookImage : styles.bookImage}
      />
      {!isFeatured && (
        <>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
        </>
      )}
    </View>
  );

  const renderFeatured = () => (
    <View style={styles.featuredContainer}>
      <Text style={styles.featuredTitle}>Nổi Bật</Text>
      <FlatList
        data={featuredBooks}
        renderItem={({ item }) => renderBook({ item, isFeatured: true })}
        keyExtractor={book => book.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Genre')}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Book App</Text>
        <TouchableOpacity onPress={() => console.log('Search clicked')}>
          <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={[{ key: 'featured' }, ...categoriesWithBooks]}
        renderItem={({ item }) => {
          if (item.key === 'featured') {
            return renderFeatured();
          }
          return renderCategory({ item });
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    marginVertical: 10,
    padding: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookItem: {
    marginRight: 15,
    width: 200,
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  featuredBookImage: {
    width: 200,
    height: 300,
    borderRadius: 5,
    marginRight: 20,
    marginVertical: 10,
  },
});

export default App;
