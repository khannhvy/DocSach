import 'react-native-gesture-handler'; // Đặt ở đầu file
import React , { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeScreen from '../../screens/TrangChu/TrangChu'; 
import CategoryScreen from '../../screens/Sach/TheLoai';
import LibraryScreen from '../../screens/ThuVien/ThuVien';
import LoginScreen from '../../screens/DangKy/Login';
import ExploreScreen from '../../screens/KhamPha/KhamPha';
import SignupScreen from '../../screens/DangKy/Signup';
import ForgotPasswordScreen from '../../screens/DangKy/FogotPasswword';
import BookDetailScreen from '../../screens/Sach/CTSach';
import ReadBookScreen from '../../screens/Sach/SachDoc';
import BooksByCategoryScreen from '../../screens/Sach/TheLoaiCuThe';
import { UserProvider } from '../../api/UserContext'; 
import MainNavigator from '../../api/MainNavigator';
import AdminScreen from '../../api/AdminScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LibraryStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen name="Thư Viện" options={{ headerShown: true }}>
        {() => <LibraryScreen isLoggedIn={isLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {() => <LoginScreen onLogin={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Đăng Ký" component={SignupScreen} />
      <Stack.Screen name="Quên mật khẩu" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Genre" component={CategoryScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="ReadBook" component={ReadBookScreen} />
      <Stack.Screen name="CategoryBooks" component={BooksByCategoryScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  // const { role } = useUser();
  return (
   <UserProvider>
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home1" 
          component={HomeStack} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={24} color="black" />
            ),
          }} 
        />
        {/* <Tab.Screen 
          name="Sách" 
          component={BookStack} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" size={24} color="black" />
            ),
          }} 
        /> */}
        <Tab.Screen 
          name="Khám Phá" 
          component={ExploreScreen }
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="safari" size={24} color="black" />
            ),
          }} 
        />
        <Tab.Screen 
          name="Thư Viện1" 
          component={LibraryStack} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-library" size={24} color="black" />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </UserProvider> 
  );
};
export default App;