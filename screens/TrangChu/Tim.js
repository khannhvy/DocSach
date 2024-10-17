import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Cài đặt axios nếu chưa có
import Icon from 'react-native-vector-icons/MaterialIcons'; // Đảm bảo bạn đã cài đặt vector-icons
import { useNavigation } from '@react-navigation/native'; // Thêm import cho điều hướng

const API_URL = 'http://192.168.1.83:3000/books'; // Thay đổi URL này thành URL thực tế của API

const SearchBooksScreen = () => {
  const navigation = useNavigation(); // Khởi tạo navigation
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        const booksData = response.data;
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy dữ liệu sách: ' + error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (!searchQuery) {
      Alert.alert('Thông báo', 'Vui lòng nhập từ khóa tìm kiếm!');
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBooks(filtered);

    if (filtered.length === 0) {
      Alert.alert('Thông báo', 'Không tìm thấy sách nào!');
    }

    console.log('Search clicked:', searchQuery);
  };

  // Chuyển hướng đến màn hình chi tiết sách
  const handleBookPress = (book) => {
    navigation.navigate('Chi tiết', { book }); // Điều hướng đến màn hình chi tiết và truyền dữ liệu
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}> 
      <View style={styles.bookItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tìm Kiếm Sách</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm sách..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Đảm bảo ID là chuỗi
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  bookItem: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SearchBooksScreen;
