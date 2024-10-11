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
import { bookContents } from '../../api/book'; // Import nội dung sách
import { MaterialIcons } from '@expo/vector-icons'; // Import biểu tượng MaterialIcons

const ReadBookScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]); // Mảng chứa nội dung chương
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Chỉ số chương hiện tại
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [settingsModalVisible, setSettingsModalVisible] = useState(false); // Modal cho cài đặt
  const [fontSize, setFontSize] = useState(16); // Trạng thái font size
  const [backgroundColor, setBackgroundColor] = useState('#fff'); // Trạng thái background

  // Tạo tham chiếu cho ScrollView
  const scrollViewRef = useRef();

  const getRandomChapters = (allChapters, minChapters = 2, maxChapters = 8) => {
    // Kiểm tra nếu allChapters không có dữ liệu
    if (!allChapters || allChapters.length === 0) return [];

    // Số chương tối đa có thể chọn (không vượt quá số chương có sẵn)
    const availableChapters = Math.min(maxChapters, allChapters.length);

    // Chọn một số ngẫu nhiên giữa minChapters và availableChapters
    const chapterCount = Math.floor(Math.random() * (availableChapters - minChapters + 1)) + minChapters;

    // Chọn một chỉ số bắt đầu ngẫu nhiên
    const startIndex = Math.floor(Math.random() * (allChapters.length - chapterCount));

    return allChapters.slice(startIndex, startIndex + chapterCount);
  };

  useEffect(() => {
    const selectedChapters = getRandomChapters(bookContents); // Gọi hàm với bookContents
    setChapters(selectedChapters);
    setLoading(false);

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
  }, [navigation, route.params.bookId]);

  const toggleModal = () => {
    setModalVisible(!modalVisible); // Chuyển đổi trạng thái hiển thị modal
  };

  const toggleSettingsModal = () => {
    setSettingsModalVisible(!settingsModalVisible); // Chuyển đổi trạng thái hiển thị settings modal
  };

  const handleSelectChapter = (index) => {
    setCurrentChapterIndex(index);
    scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Chọn chương khi nhấn vào danh sách
    toggleModal(); // Đóng modal
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1); // Tăng chỉ số chương nếu còn chương
      // Cuộn đến đầu chương mới
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView ref={scrollViewRef}>
        {/* Hiển thị chương hiện tại */}
        <Text style={styles.chapterTitle}>{`Chương ${currentChapterIndex + 1}`}</Text>
        <Text style={[styles.text, { fontSize }]}>{chapters[currentChapterIndex]}</Text>
        {currentChapterIndex < chapters.length - 1 && (
          <TouchableOpacity onPress={handleNextChapter} style={styles.nextChapterButton}>
            <Text style={styles.nextChapterButtonText}>Đọc chương tiếp theo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Nút Cài Đặt ở góc dưới phải */}
      <TouchableOpacity onPress={toggleSettingsModal} style={styles.settingsButton}>
        <MaterialIcons name="settings" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal cài đặt */}
      <Modal visible={settingsModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cài đặt</Text>

            {/* Các tuỳ chọn cài đặt */}
            <TouchableOpacity onPress={() => setBackgroundColor('#f0f8ff')} style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Đổi màu nền (Xanh nhạt)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBackgroundColor('#fff')} style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Đặt lại màu nền (Trắng)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFontSize(fontSize + 2)} style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Tăng kích thước chữ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFontSize(fontSize - 2)} style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Giảm kích thước chữ</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleSettingsModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal hiển thị danh sách chương */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Danh sách chương</Text>
            <FlatList
              data={chapters}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleSelectChapter(index)}>
                  <Text style={styles.modalChapter}>{`Chương ${index + 1}`}</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  menuButton: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalChapter: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
  nextChapterButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextChapterButtonText: {
    color: '#fff',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  settingButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ReadBookScreen;
