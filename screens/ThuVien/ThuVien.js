import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LibraryScreen = ({ isLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Điều hướng đến màn hình đăng nhập
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Text style={styles.welcomeText}>Chào mừng bạn đến với thư viện!</Text>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.promptText}>Bạn chưa đăng nhập!</Text>
          <Button title="Đăng Nhập" onPress={handleLogin} />
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
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginContainer: {
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LibraryScreen;
