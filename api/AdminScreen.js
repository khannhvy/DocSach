import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from './UserContext'; 
const AdminScreen = () => {
  const { role } = useUser();

  if (role !== 'admin') {
    return <Text>You do not have permission to access this page.</Text>;
  }

  return (
    <View>
      <Text>Welcome, Admin</Text>
    </View>
  );
};

export default AdminScreen;
