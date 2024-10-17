import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const App = ({ navigation }) => {
  const [categoriesWithBooks, setCategoriesWithBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position
  const scrollViewRef = useRef(null); // Ref for Animated.ScrollView

  const fetchBooksAndCategories = async () => {
    try {
      const booksResponse = await axios.get('http://192.168.1.83:3000/books');
      const categoriesResponse = await axios.get('http://192.168.1.83:3000/categories');

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
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Thể loại', { categoryId: item.id, categoryName: item.name })}>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
       data={item.books.slice(0, 5)}
        //data={item.books}
        renderItem={renderBook}
        keyExtractor={book => book.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderBook = ({ item, isFeatured }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('Chi tiết', {
        book: item
        // bookId: item.id,
        // bookTitle: item.title,
        // bookAuthor: item.author,
        // bookImage: item.coverImage
      })}
    >
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
    </TouchableOpacity>
  );

  const renderFeatured = () => (
    <View style={styles.featuredContainer}>
      <Text style={styles.featuredTitle}>Nổi Bật</Text>
      <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollView}
        ref={scrollViewRef}
        snapToInterval={screenWidth * 0.65} // Adjust to control snap effect
        decelerationRate="fast"
        snapToAlignment="center"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {featuredBooks.map((item, index) => {
          const inputRange = [
            (index - 1) * screenWidth * 0.5,
            index * screenWidth * 0.65,
            (index + 1) * screenWidth * 0.60,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.1, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={item.id} style={{ transform: [{ scale }] }}>
              {renderBook({ item, isFeatured: true })}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
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
        <TouchableOpacity onPress={() => navigation.navigate('Tìm kiếm')}>
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
    width: 150,
    height: 230, // Giảm chiều cao cho các ảnh sách
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
    width: 220, // Kích thước lớn hơn cho ảnh nổi bật
    height: 350, // Kích thước lớn hơn cho ảnh nổi bật
    borderRadius: 5,
    //marginRight: 20,
   // marginVertical: 10,
    marginHorizontal: 0.08,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Căn đều giữa tiêu đề và biểu tượng
    alignItems: 'center',
  },
  imageScrollView: {
   
  },
});

export default App;
