import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllEvents = async () => {
    return await prisma.events.findMany();
};

export const getEventById = async (id: number) => {
    return await prisma.events.findUnique({
        where: { id },
    });
};

export const createEvent = async (data: any) => {
    console.log("SERVICE", data);

    return await prisma.events.create({
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: data.fecha,
            hora: data.hora,
            lugar: data.lugar,
            estado: data.estado,
        },
    });
};

export const updateEvent = async (id: number, data: any) => {
    return await prisma.events.update({
        where: { id },
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: data.fecha,
            hora: data.hora,
            lugar: data.lugar,
            estado: data.estado,
        },
    });
};

export const deleteEvent = async (id: number) => {
    return await prisma.events.delete({
        where: { id },
    });
};
