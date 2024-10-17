import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../../firebaseConfig'; // Giả sử firebase đã được cấu hình
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AddExploreScreen = () => {
  const [articles, setArticles] = useState([]);
  const [isNhanVien, setIsNhanVien] = useState(false); // Kiểm tra vai trò
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Theo dõi trạng thái đăng nhập
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserRole(user.uid);
        fetchArticles();
      } else {
        // Nếu không có người dùng đăng nhập, có thể làm mới danh sách bài viết hoặc thiết lập lại trạng thái
        setArticles([]);
        setIsNhanVien(false);
      }
    });

    // Dọn dẹp khi component bị hủy
    return () => unsubscribe();
  }, []);

  // Lấy thông tin vai trò người dùng hiện tại từ Firestore
  const fetchUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const role = userDoc.data().role; // Lấy vai trò người dùng
      setIsNhanVien(role === 'nhanvien'); // Xác định nếu là 'nhanvien'
    }
  };

  // Lấy dữ liệu bài viết
  const fetchArticles = async () => {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articlesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setArticles(articlesData);
  };

  // Hàm xử lý thêm bài viết
  const handleAddArticle = async () => {
    if (!title || !content) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ tiêu đề và nội dung bài viết!');
      return;
    }

    try {
      await addDoc(collection(db, 'articles'), {
        title,
        content,
        authorId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      Alert.alert('Thành công', 'Bài viết đã được thêm!');

      // Làm mới danh sách bài viết
      fetchArticles();

      // Xóa form
      setTitle('');
      setContent('');
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi khi thêm bài viết: ' + error.message);
    }
  };

  // Hiển thị danh sách bài viết
  const renderItem = ({ item }) => (
    <View style={styles.articleItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khám Phá</Text>

      {/* Nếu là nhân viên, hiển thị form thêm bài viết */}
      {isNhanVien && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Tiêu đề bài viết"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Nội dung bài viết"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleAddArticle}>
            <Text style={styles.buttonText}>Thêm Bài Viết</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hiển thị danh sách bài viết */}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddExploreScreen;
