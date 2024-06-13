
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            rol: true,
        },

    });
    console.log("USERS", users);

    return users;
};

export const createUser = async (data: any) => {
    return await prisma.user.create({

        data: {
            nombre: data.nombre,
            cedula: data.cedula,
            email: data.email,
            password: data.password,
            telefono: data.telefono,
            rolId: data.rolId,
            estado: data.estado,
        }
    });
};

export const updateUser = async (id: number, data: any) => {
    return await prisma.user.update({
        where: { id: id },
        data: {
            nombre: data.nombre,
            cedula: data.cedula,
            email: data.email,
            password: data.password,
            telefono: data.telefono,
            rolId: data.rolId,
            estado: data.estado,
        }
    });
};
