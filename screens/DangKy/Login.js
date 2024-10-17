import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { UserContext } from '../../api/UserContext'; // Import UserContext

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useContext(UserContext); // Lấy hàm login từ UserContext

  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data(); // Lấy dữ liệu người dùng
          console.log("Dữ liệu người dùng:", userData); // Kiểm tra dữ liệu ở đây
  
          // Kiểm tra nếu userData không null hoặc undefined
          if (userData) {
            const userRole = userData.role; 
            console.log("Vai trò người dùng:", userRole); 
            
            // Gọi hàm login với thông tin người dùng
            login(userData); // Ghi nhớ thông tin người dùng trong UserContext

            // Hiển thị thông báo đăng nhập thành công
            Alert.alert('Thông báo', 'Đăng nhập thành công!');

            // Điều hướng đến màn hình tương ứng dựa trên vai trò người dùng
            if (userRole === 'admin') {
              navigation.navigate('Admin'); 
            } else if (userRole === 'nhanvien') { // Giả định có vai trò 'user'
              navigation.navigate('Thư Viện1'); 
            } else {
              navigation.navigate('Thư Viện1'); // Bạn có thể điều hướng đến màn hình khác nếu cần
            }
          } else {
            Alert.alert('Thông báo', 'Không tìm thấy thông tin người dùng!');
          }
        } else {
          Alert.alert('Thông báo', 'Không tìm thấy thông tin người dùng!');
        }
      } catch (error) {
        Alert.alert('Lỗi', error.message);
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Đăng Ký')}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quên mật khẩu')}>
        <Text style={styles.link}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen; 
