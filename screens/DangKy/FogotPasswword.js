// screens/DangKy/ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebaseConfig'; // Đường dẫn tương ứng tới tệp firebaseConfig
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('Thông báo', `Đường dẫn đặt lại mật khẩu đã được gửi tới ${email}.`);
      } catch (error) {
        Alert.alert('Lỗi', error.message);
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email của bạn.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <Text style={styles.subtitle}>Nhập địa chỉ email của bạn để đặt lại mật khẩu:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email của bạn"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.link}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Màu nền nhẹ
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Màu chữ
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555', // Màu chữ
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff', // Màu nền trắng cho ô nhập
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Hiệu ứng bóng
  },
  button: {
    backgroundColor: '#007BFF', // Màu nền nút
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    width: 100,
    height: 55,
    marginHorizontal: 135,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center', // Căn giữa
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
