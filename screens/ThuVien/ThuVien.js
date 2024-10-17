import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { UserContext } from '../../api/UserContext'; 
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebaseConfig'; 

const LibraryScreen = () => {
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useContext(UserContext); 

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      logout(); 
      Alert.alert("Thông báo", "Bạn đã đăng xuất thành công.");
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn && user ? (
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Chào mừng bạn đến với thư viện, {user.name}!</Text>
          <Text style={styles.userInfoText}>Email: {user.email}</Text>
          <Text style={styles.userInfoText}>Số điện thoại: {user.phone}</Text>
          
          <Button title="Đăng Xuất" onPress={handleLogout} color="#ff4c4c" /> 
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.promptText}>Bạn chưa đăng nhập!</Text>
          <Button title="Đăng Nhập" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Màu nền nhẹ
  },
  contentContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center', // Căn giữa nội dung
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold', // Chữ in đậm
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333', // Màu chữ tối
  },
  loginContainer: {
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LibraryScreen; 
