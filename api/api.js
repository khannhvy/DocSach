// api.js
import axios from 'axios';

// Đặt PORT và BASE_URL cho API của bạn
// const PORT = process.env.PORT || 3000; // Thay đổi giá trị này nếu cần
// const BASE_URL = `http://localhost:3000`;
const BASE_URL = `http://192.168.1.83:3000`;

// Tạo một instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm để lấy danh sách tất cả sách
export const fetchBooks = async () => {
  try {
    const response = await api.get('/books'); // Thay '/books' bằng endpoint tương ứng
    console.log('Books response:', response); 
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Hàm để thêm một cuốn sách
export const addBook = async (bookData) => {
  try {
    const response = await api.post('/books', bookData); // Thay '/books' bằng endpoint tương ứng
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Hàm để cập nhật thông tin sách theo ID
export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData); // Thay '/books' bằng endpoint tương ứng
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Hàm để xóa một cuốn sách theo ID
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`); // Thay '/books' bằng endpoint tương ứng
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Hàm để lấy danh sách loại sách
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories'); // Thay '/categories' bằng endpoint tương ứng
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Hàm để thêm một loại sách
export const addCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData); // Thay '/categories' bằng endpoint tương ứng
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

//hàm để lấy danh sách sách theo thể loại:

export const fetchBooksByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/books?categoryId=${categoryId}`); // Thay '/books' bằng endpoint tương ứng
      return response.data;
    } catch (error) {
      console.error('Error fetching books by category:', error);
      throw error;
    }
  };

export default api;
