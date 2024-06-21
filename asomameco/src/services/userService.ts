import api from '../api/axios';
import { IUser, IUserCreate } from '../interfaces/user';

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get('users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    const users: IUser[] = response.data.data; // Acceder a la propiedad `data`
    return users;
}

export const createUser = async (newUser: IUserCreate) => {
    const token = localStorage.getItem("token");
    const response = await api.post('users', newUser, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;
}

export const updateUserApi = async (updatedUser: IUser) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`users/${updatedUser.id}`, updatedUser, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;
}

export const deleteUserApi = async (userId: number) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;
}

