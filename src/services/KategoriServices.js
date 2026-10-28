import axios from 'axios';

const API_URL = 'http://103.247.10.59:3000/api/categories';

// 1. Buat instance Axios khusus
const api = axios.create({
    baseURL: API_URL
});

// 2. Tambahkan "Interceptor" untuk menyisipkan token otomatis
api.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage. 
        // ⚠️ PENTING: Sesuaikan 'token' dengan nama key yang kamu pakai saat login!
        // Misalnya: 'token', 'access_token', atau 'jwt'
        const token = localStorage.getItem('token'); 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Fungsi-fungsi API menggunakan instance 'api' (bukan axios biasa)
export const getAllCategories = () => {
    return api.get(''); // Karena baseURL sudah API_URL, cukup string kosong atau '/'
}

export const getCategoryById = (id) => {
    return api.get(`/${id}`);
}

export const createCategory = (data) => {
    return api.post('', data);
}

export const updateCategory = (id, data) => {
    return api.put(`/${id}`, data);
}

export const deleteCategory = (id) => {
    return api.delete(`/${id}`);
}