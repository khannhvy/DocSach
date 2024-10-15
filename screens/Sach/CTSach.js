import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params; // Receive the book object from route.params

  // Construct the cover image URL
  const coverImageUrl = `http://192.168.1.83:3000/${book.coverImage.replace(/\\/g, '/')}`;

  // Function to handle read button press
  const handleReadPress = () => {
    navigation.navigate('ReadBook', { bookId: book.id }); // Adjust the navigation target as necessary
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: coverImageUrl }} // Use valid image URL
        style={styles.coverImage} 
        resizeMode="contain" 
        onError={() => {
          console.error('Failed to load image');
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
