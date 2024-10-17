import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation
import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../../firebaseConfig'; // Import auth từ tệp cấu hình Firebase

// Khởi tạo Firestore
const db = getFirestore();

const AccountScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Khởi tạo useNavigation
  const user = route.params?.user; // Nhận thông tin người dùng từ tham số của route
  const onLogout = route.params?.onLogout || (() => {}); // Đặt giá trị mặc định cho onLogout

  const [readingHistory, setReadingHistory] = useState([]); // State lưu trữ lịch sử đọc sách

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Gọi hàm đăng xuất từ Firebase
//       console.log('Đăng xuất thành công');
//       Alert.alert("Thông báo", "Bạn đã đăng xuất thành công."); // Thông báo đăng xuất thành công
//       onLogout(); // Gọi hàm onLogout từ tham số route để cập nhật trạng thái người dùng
//       navigation.navigate('Thư Viện'); // Chuyển hướng đến LibraryScreen
//     } catch (error) {
//       console.error('Lỗi khi đăng xuất:', error);
//       Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại."); // Thông báo lỗi
//     }
//   };

  useEffect(() => {
    // Hàm tải lịch sử đọc sách từ Firestore
    const loadReadingHistory = async (userId) => {
      try {
        const userRef = doc(db, 'users', userId); // Tham chiếu đến tài liệu người dùng trong Firestore
        const userDoc = await getDoc(userRef); // Lấy tài liệu người dùng

        console.log('User Document:', userDoc.data()); // In ra dữ liệu tài liệu để kiểm tra

        if (userDoc.exists()) {
          const history = userDoc.data().readingHistory || []; // Lưu lịch sử đọc vào state
          console.log('Reading History:', history); // In ra lịch sử đọc để kiểm tra
          setReadingHistory(history);
        } else {
          console.log('No such document!');
          setReadingHistory([]); // Nếu không có tài liệu, khởi tạo lịch sử rỗng
        }
      } catch (error) {
        console.error('Error loading reading history:', error);
        Alert.alert("Lỗi", "Không thể tải lịch sử đọc sách. Vui lòng thử lại."); // Thông báo lỗi
        setReadingHistory([]); // Nếu có lỗi, khởi tạo lịch sử rỗng
      }
    };

    if (user?.id) { // Kiểm tra nếu có userId
      loadReadingHistory(user.id); // Gọi hàm tải lịch sử
    }
  }, [user]); // Chạy lại khi user thay đổi

  // Nếu không có thông tin người dùng
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Không có thông tin người dùng!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin tài khoản</Text>
      <Text>Tên: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Số điện thoại: {user.phone}</Text>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity> */}

      <Text style={styles.historyTitle}>Lịch sử đọc sách:</Text>
      {readingHistory.length > 0 ? (
        <FlatList
          data={readingHistory}
          keyExtractor={(item) => `${item.bookId}-${item.chapterIndex}`} // Đảm bảo key duy nhất
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{item.bookId} - Chương: {item.chapterIndex + 1}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có lịch sử đọc sách...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4c4c',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AccountScreen;
