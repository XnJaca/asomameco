import api from '../api/axios';
import { IRole } from '../interfaces/role';

export const getAllRoles = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get('role', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    const roles: IRole[] = response.data.data; // Acceder a la propiedad `data`

    return roles;
}