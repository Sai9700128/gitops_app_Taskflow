import axios from 'axios';

// Use relative URLs in production (nginx will proxy)
// Use localhost in development
const isDev = import.meta.env.DEV;

const USER_API = isDev ? 'http://localhost:3001/api' : '/api';
const TASK_API = isDev ? 'http://localhost:3002/api' : '/api';

// Create axios instances
const userApi = axios.create({ baseURL: USER_API });
const taskApi = axios.create({ baseURL: TASK_API });

// Add auth token to requests
const setAuthToken = (token) => {
  if (token) {
    userApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    taskApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete userApi.defaults.headers.common['Authorization'];
    delete taskApi.defaults.headers.common['Authorization'];
  }
};

// Initialize token from localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Auth API
export const authAPI = {
  register: (data) => userApi.post('/users/register', data),
  login: (data) => userApi.post('/users/login', data),
  getMe: () => userApi.get('/users/me'),
  getAllUsers: () => userApi.get('/users'),
};

// Tasks API
export const tasksAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return taskApi.get(`/tasks${params ? `?${params}` : ''}`);
  },
  getById: (id) => taskApi.get(`/tasks/${id}`),
  getMyTasks: () => taskApi.get('/tasks/my'),
  getStats: () => taskApi.get('/tasks/stats'),
  create: (data) => taskApi.post('/tasks', data),
  update: (id, data) => taskApi.put(`/tasks/${id}`, data),
  delete: (id) => taskApi.delete(`/tasks/${id}`),
};

export { setAuthToken };