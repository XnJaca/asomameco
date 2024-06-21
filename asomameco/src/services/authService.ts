import api from '../api/axios';

interface LoginData {
    user: string;
    password: string;
}

export const login = async (data: LoginData) => {
    const response = await api.post('auth/login', data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/logout');
    return response.data;
};
