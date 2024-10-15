import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const ReadBookScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [selectedFontFamily, setSelectedFontFamily] = useState('System');
  const scrollViewRef = useRef();

  const fetchBookContent = async (bookId) => {
    try {
      const response = await fetch(`http://192.168.1.83:3000/books/${bookId}`); // Thay thế bằng URL API của bạn
      const data = await response.json();
      return data.noidung; // Giả sử rằng API trả về nội dung sách trong trường "noidung"
    } catch (error) {
      console.error('Error fetching book content:', error);
      return null; // Trả về null nếu có lỗi
    }
  };

  useEffect(() => {
    const loadBookContent = async () => {
      const content = await fetchBookContent(route.params.bookId);
      if (content) {
        const splitChapters = [];
        for (let i = 0; i < content.length; i += 1200) {
          splitChapters.push(content.substring(i, i + 1200)); // Chia nội dung thành đoạn 100 ký tự
        }
        setChapters(splitChapters);
      }
      setLoading(false);
    };

    loadBookContent();

    navigation.setOptions({
      headerTitle: 'Đọc Sách',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route.params.bookId]); // Đảm bảo rằng bookId được bao gồm trong dependency array

  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
  });

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleSettingsModal = () => {
    setSettingsModalVisible(!settingsModalVisible);
  };

  const handleSelectChapter = (index) => {
    setCurrentChapterIndex(index);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    toggleModal();
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const colors = ['#fff', '#f0f8ff', '#ffe4e1', '#fafad2', '#d3ffd3', '#add8e6'];
  const colorNames = ['Trắng', 'Xanh nhạt', 'Hồng nhạt', 'Vàng nhạt', 'Xanh lá cây nhạt', 'Xanh dương nhạt'];
  const fonts = ['Roboto-Black', 'Roboto-Regular', 'Roboto-Bold', 'Roboto-Light', 'Roboto-Thin']; // Danh sách font

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView ref={scrollViewRef}>
        <Text style={[styles.chapterTitle, { fontFamily: selectedFontFamily }]}>
          {`Chương ${currentChapterIndex + 1}`}
        </Text>
        <Text style={[styles.text, { fontSize, fontFamily: selectedFontFamily }]}>
          {chapters[currentChapterIndex]} {/* Nội dung sách sẽ được hiển thị tại đây */}
        </Text>
        {currentChapterIndex < chapters.length - 1 && (
          <TouchableOpacity onPress={handleNextChapter} style={styles.nextChapterButton}>
            <Text style={styles.nextChapterButtonText}>Đọc chương tiếp theo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity onPress={toggleSettingsModal} style={styles.settingsButton}>
        <MaterialIcons name="settings" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={settingsModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cài đặt</Text>
            <Text style={styles.settingTitle}>Chọn màu nền:</Text>
            {colors.map((color, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setBackgroundColor(color)} 
                style={[styles.colorButton, { backgroundColor: color }]}>
                <Text style={styles.colorButtonText}>{colorNames[index]}</Text> 
              </TouchableOpacity>
            ))}
            <Text style={styles.settingTitle}>Chọn font chữ:</Text>
            {fonts.map((font, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedFontFamily(font)} style={styles.fontButton}>
                <Text style={styles.fontButtonText}>{font}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.settingTitle}>Kích thước chữ:</Text>
            <View style={styles.fontSizeControls}>
              <TouchableOpacity onPress={() => setFontSize((prev) => Math.max(prev - 2, 10))}>
                <Text style={styles.fontSizeButton}>-</Text>
              </TouchableOpacity>
              <Text>{fontSize}</Text>
              <TouchableOpacity onPress={() => setFontSize((prev) => prev + 2)}>
                <Text style={styles.fontSizeButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleSettingsModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn chương</Text>
            <FlatList
              data={chapters}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleSelectChapter(index)}>
                  <Text style={styles.chapterItem}>{`Chương ${index + 1}`}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  nextChapterButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  nextChapterButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  colorButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  colorButtonText: {
    textAlign: 'center',
  },
  fontButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fontButtonText: {
    textAlign: 'left',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  fontSizeButton: {
    fontSize: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  chapterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ReadBookScreen;
