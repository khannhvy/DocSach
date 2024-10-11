// ExploreScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ExploreScreen = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu bài viết. Thay thế bằng việc gọi API của bạn.
    const fetchArticles = async () => {
      const response = [
        { id: '1', title: 'Bài viết 1', content: 'Nội dung bài viết 1' },
        { id: '2', title: 'Bài viết 2', content: 'Nội dung bài viết 2' },
        { id: '3', title: 'Bài viết 3', content: 'Nội dung bài viết 3' },
      ];
      setArticles(response);
    };

    fetchArticles();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.articleItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khám Phá</Text>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  articleItem: {
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
});

export default ExploreScreen;
