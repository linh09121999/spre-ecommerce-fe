import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const API_BASE = 'https://demo.spreecommerce.org';

// Tạo instance axios với config mặc định
const api: AxiosInstance = axios.create({
    baseURL: API_BASE, // thay bằng domain của bạn
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor xử lý request
api.interceptors.request.use(
    (config) => {
        const orderToken = localStorage.getItem("order_token");
        if (orderToken) {
            config.headers["X-Spree-Order-Token"] = orderToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor xử lý response
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;