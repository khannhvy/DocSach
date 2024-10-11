import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from './UserContext'; // Lấy role người dùng
import AdminScreen from './AdminScreen';
import StaffScreen from './StaffScreen';
import UserScreen from './UserScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { role } = useUser();

  return (
    <Stack.Navigator>
      <Stack.Screen name="UserScreen" component={UserScreen} />

      {(role === 'staff' || role === 'admin') && (
        <Stack.Screen name="StaffScreen" component={StaffScreen} />
      )}

      {role === 'admin' && (
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
