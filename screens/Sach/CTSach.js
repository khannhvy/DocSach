import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params; // Receive book details from route.params
  const [book, setBook] = useState(null); // State to hold book details
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch book details based on bookId
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.83:3000/books/${bookId}`);
        const bookData = await response.json();
        setBook(bookData); // Set book details
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Show loading indicator while fetching data
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // If the book is not found, show an appropriate message
  if (!book) {
    return <Text>Book not found</Text>;
  }

  // Construct the cover image URL
  // const coverImageUrl = `http://192.168.1.83:3000/${book.coverImage.replace(/\\/g, '/')}`;
  const coverImageUrl = `http://192.168.105.58:3000/${book.coverImage.replace(/\\/g, '/')}`;
  // Function to handle read button press
  const handleReadPress = () => {
    navigation.navigate('ReadBook', { bookId: book.id }); // Adjust the navigation target as necessary
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: coverImageUrl }} // Use valid image URL
        style={styles.coverImage} 
        resizeMode="contain" // Maintain aspect ratio
        onError={() => {
          console.error('Failed to load image');
          // Optionally show a fallback image or message
        }}
      />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.year}>Year: {book.year}</Text>
      <Text style={styles.category}>Category: {book.category}</Text>
      <Text style={styles.description}>{book.description}</Text>

      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={handleReadPress}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '90%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'justify',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BookDetailScreen;
