import 'react-native-gesture-handler'; // Đặt ở đầu file
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
import AdminScreen from '../../api/AdminScreen';
import AddExploreScreen from '../../screens/KhamPha/ThemKP';
import UserScreen from '../../api/UserScreen';
import AccountScreen from '../../screens/ThuVien/AccountScreen';
import SearchBooksScreen from '../../screens/TrangChu/Tim';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LibraryStack = ({ onLogin }) => {
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen name="Thư Viện1" options={{ headerShown: false }}>
        {() => <LibraryScreen onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Đăng Ký" component={SignupScreen} />
      <Stack.Screen name="Quên mật khẩu" component={ForgotPasswordScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Genre" component={CategoryScreen} />
      <Stack.Screen name="Chi tiết" component={BookDetailScreen} />
      <Stack.Screen name="ReadBook" component={ReadBookScreen} />
      <Stack.Screen name="Thể loại" component={BooksByCategoryScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Tìm kiếm" component={SearchBooksScreen} />
    </Stack.Navigator>
  );
};

const KhamPhaStack = ({ userRole }) => {
 // console.log("KhamPhaStack userRole:", userRole); 
  return (
    <Stack.Navigator>
      {userRole === 'nhanvien' ? (
        <Stack.Screen name="AddKP" component={AddExploreScreen} options={{ title: 'Thêm Khám Phá', headerShown: false }} />
      ) : (
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ title: 'Khám Phá',  headerShown: false}} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState('nhanvien'); 

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  useEffect(() => {
    console.log("userRole đã được cập nhật:", userRole);
  }, [userRole]);

  return (
    <UserProvider>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen 
            name="Trang chủ" 
            component={HomeStack} 
            options={{
              tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
            }} 
          />
          <Tab.Screen 
            name="Khám Phá" 
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="safari" size={24} color={color} />,
            }}>
            {() => <KhamPhaStack userRole={userRole} />}  
          </Tab.Screen>
          <Tab.Screen
            name="Thư Viện"
            options={{
              tabBarIcon: ({ color }) => <MaterialIcons name="local-library" size={24} color={color}/>,
            }}>
            {() => <LibraryStack onLogin={handleLogin} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider> 
  );
};

export default App;
