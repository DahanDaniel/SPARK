import axios from 'axios';

// Konfiguracja Axiosa tak, by przesyłał ciasteczka z JWT
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
