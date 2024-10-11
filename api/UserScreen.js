import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from './UserContext';

const UserScreen = () => {
  const { role } = useUser();

  return (
    <View>
      <Text>User Dashboard</Text>
    </View>
  );
};

export default UserScreen;
