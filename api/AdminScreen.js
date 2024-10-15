// AdminScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../api/UserContext';

const AdminScreen = () => {
  const { role } = useUser();

  // Kiểm tra quyền truy cập
  if (role !== 'admin') {
    return (
      <View>
        <Text>Bạn không có quyền truy cập vào màn hình này.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Chào mừng đến với trang Admin!</Text>
    </View>
  );
};

export default AdminScreen;
