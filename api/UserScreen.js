// screens/UserScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const UserScreen = ({ onLogout }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lịch sử đọc của bạn</Text>
      {/* Hiển thị lịch sử đọc ở đây */}
      
      <Button title="Đăng xuất" onPress={onLogout} />
    </View>
  );
};

export default UserScreen;
