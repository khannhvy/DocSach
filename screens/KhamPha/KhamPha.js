import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { db } from '../../firebaseConfig'; // Import db từ firebaseConfig
import { collection, getDocs } from 'firebase/firestore'; // Import các hàm cần thiết
import { getAuth } from 'firebase/auth'; // Import để kiểm tra người dùng

const ExploreScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Hàm lấy bài viết
  const fetchArticles = async () => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const auth = getAuth();
    if (!auth.currentUser) {
      Alert.alert('Lỗi', 'Bạn cần đăng nhập để xem nội dung này.');
      setLoading(false);
      return;
    }

    try {
      const articlesCollection = collection(db, 'articles'); // Thay 'articles' bằng tên collection của bạn
      const articleSnapshot = await getDocs(articlesCollection);
      
      // Kiểm tra xem có tài liệu nào trong collection hay không
      if (articleSnapshot.empty) {
        console.log('Không có bài viết nào trong collection.');
      }

      const articleList = articleSnapshot.docs.map(doc => ({
        id: doc.id, // Lưu id của tài liệu
        ...doc.data(), // Lấy dữ liệu của tài liệu
      }));

      console.log("Fetched articles:", articleList); // In danh sách bài viết ra console
      setArticles(articleList);
    } catch (error) {
      console.error("Error fetching articles: ", error);
      Alert.alert('Lỗi', 'Không thể lấy thông tin bài viết.');
    } finally {
      setLoading(false); // Đặt loading thành false sau khi hoàn tất
    }
  };

  useEffect(() => {
    fetchArticles(); // Gọi hàm lấy bài viết khi component được mount

    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchArticles(); // Gọi lại hàm lấy bài viết nếu có người dùng đăng nhập
      } else {
        setArticles([]); // Xóa danh sách bài viết nếu không có người dùng
      }
    });

    return () => unsubscribe(); // Huỷ bỏ khi component unmount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.articleItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị loader khi đang tải
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khám Phá</Text>
      {articles.length === 0 ? (
        <Text>Không có bài viết nào.</Text>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
