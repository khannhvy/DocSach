import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchCategories } from '../../api/api'; // Ensure the path is correct to api.js
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        //console.log(data);
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
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

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('Thể loại', { categoryId: item.id, categoryName: item.name })} // Corrected screen name
    >
      <Text style={styles.itemText}>{item.name}</Text> 
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id.toString()} // Ensure 'id' is the correct property
      contentContainerStyle={styles.container}
    />
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
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: '#f8f9fa',
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default CategoriesScreen;
