import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { fetchBooksByCategory } from '../../api/api'; // Đảm bảo đường dẫn chính xác tới api.js

const BooksByCategoryScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Lấy danh sách sách từ API dựa trên categoryId
        const data = await fetchBooksByCategory(categoryId); 
        console.log(data); // Kiểm tra cấu trúc dữ liệu

        // Lọc sách dựa trên `categoryId` để chỉ hiển thị sách thuộc thể loại đã chọn
        const filteredBooks = data.filter(book => book.categoryId === categoryId);
        setBooks(filteredBooks);
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderBookItem = ({ item }) => {
    // const coverImageUrl = item.coverImage 
    //   ? `http://192.168.1.83:3000/${item.coverImage.replace(/\\/g, '/')}` 
    //   : 'default_image_url.png'; // Sử dụng URL hình ảnh mặc định hợp lệ

    const coverImageUrl = item.coverImage 
    ? `http://192.168.105.58:3000/${item.coverImage.replace(/\\/g, '/')}` 
    : 'default_image_url.png'; // Sử dụng URL hình ảnh mặc định hợp lệ

    // Ghi lại lỗi nếu không có ảnh bìa
    if (!item.coverImage) {
      console.error(`No cover image for book: ${item.title}`);
    }

    return (
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('BookDetail', { book: item })}>
        <Image 
          source={{ uri: coverImageUrl }} 
          style={styles.coverImage} 
          resizeMode="cover" 
          onError={() => {
            console.error('Failed to load image');
          }}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{categoryName}</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Không có sách nào trong thể loại này.</Text>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
  },
  coverImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noBooksText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BooksByCategoryScreen;
