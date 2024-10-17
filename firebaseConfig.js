
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCyKgaOqbZIMeBTvwJ4H-7Z4MQFrbJ6NSs",
    authDomain: "docsach-44e90.firebaseapp.com",
    projectId: "docsach-44e90",
    storageBucket: "docsach-44e90.appspot.com",
    messagingSenderId: "397647768476",
    appId: "1:397647768476:web:703e84770548f8920e7659",
    measurementId: "G-B13EJ90CSH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sử dụng AsyncStorage để lưu trạng thái đăng nhập
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore'; 
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyCyKgaOqbZIMeBTvwJ4H-7Z4MQFrbJ6NSs",
//     authDomain: "docsach-44e90.firebaseapp.com",
//     projectId: "docsach-44e90",
//     storageBucket: "docsach-44e90.appspot.com",
//     messagingSenderId: "397647768476",
//     appId: "1:397647768476:web:703e84770548f8920e7659",
//     measurementId: "G-B13EJ90CSH"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Initialize Firebase Auth
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
// });

// // Thêm trường lịch sử đọc cho người dùng
// const addReadingHistoryField = async (userId) => {
//     const userRef = doc(db, 'readingHistory', userId);
//     await setDoc(userRef, { history: [] }, { merge: true });
// };

// // Lưu lịch sử đọc
// const saveReadingHistory = async (bookId, chapterIndex) => {
//     try {
//         const user = auth.currentUser;
//         if (!user) {
//             Alert.alert('Lỗi', 'Bạn cần đăng nhập để lưu lịch sử đọc.');
//             return;
//         }
//         const historyRef = doc(db, 'readingHistory', user.uid);

//         // Cập nhật hoặc tạo tài liệu lịch sử đọc
//         await updateDoc(historyRef, {
//             history: arrayUnion({ bookId, chapterIndex, timestamp: new Date() }),
//         });
//         Alert.alert('Thành công', 'Lịch sử đọc đã được lưu.');
//     } catch (error) {
//         console.error('Lỗi khi lưu lịch sử đọc:', error);
//         Alert.alert('Lỗi', 'Không thể lưu lịch sử đọc. Vui lòng thử lại.');
//     }
// };

// // Lấy lịch sử đọc
// const getReadingHistory = async () => {
//     try {
//         const user = auth.currentUser;
//         if (!user) {
//             Alert.alert('Lỗi', 'Bạn cần đăng nhập để xem lịch sử đọc.');
//             return null;
//         }
//         const historyRef = doc(db, 'readingHistory', user.uid);
//         const docSnap = await getDoc(historyRef);
        
//         if (docSnap.exists()) {
//             return docSnap.data().history;
//         } else {
//             console.log('Không tìm thấy tài liệu lịch sử đọc.');
//             return [];
//         }
//     } catch (error) {
//         console.error('Lỗi khi lấy lịch sử đọc:', error);
//         Alert.alert('Lỗi', 'Không thể lấy lịch sử đọc. Vui lòng thử lại.');
//     }
// };

// // Đăng ký người dùng mới
// const registerUser = async (email, password) => {
//     try {
//         const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//         await addReadingHistoryField(userCredential.user.uid); // Thêm trường lịch sử đọc sau khi đăng ký
//         console.log('Người dùng đã đăng ký:', userCredential.user.uid);
//         return userCredential.user.uid;
//     } catch (error) {
//         console.error('Lỗi khi đăng ký người dùng:', error);
//         throw error;
//     }
// };

// // Đăng nhập người dùng
// const loginUser = async (email, password) => {
//     try {
//         const userCredential = await auth.signInWithEmailAndPassword(email, password);
//         console.log('Người dùng đã đăng nhập:', userCredential.user.uid);
//         return userCredential.user.uid;
//     } catch (error) {
//         console.error('Lỗi khi đăng nhập:', error);
//         throw error;
//     }
// };

// // Đăng xuất người dùng
// const logoutUser = async () => {
//     try {
//         await auth.signOut();
//         console.log('Người dùng đã đăng xuất.');
//     } catch (error) {
//         console.error('Lỗi khi đăng xuất:', error);
//     }
// };

// // Xuất các hàm
// export { 
//     db, 
//     auth, 
//     addReadingHistoryField,
//     saveReadingHistory, 
//     getReadingHistory, 
//     registerUser, 
//     loginUser, 
//     logoutUser 
// }; 
