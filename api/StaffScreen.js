import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from './UserContext';

const StaffScreen = () => {
  const { role } = useUser();

  if (role !== 'staff' && role !== 'admin') {
    return <Text>You do not have permission to access this page.</Text>;
  }

  return (
    <View>
      <Text>Staff Dashboard</Text>
    </View>
  );
};

export default StaffScreen;
