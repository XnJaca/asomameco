import { Request, Response } from 'express';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../services/eventService';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await getAllEvents();
        res.status(200).json({
            status: 'success',
            data: events,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await getEventById(Number(id));
        res.status(200).json({
            status: 'success',
            data: event,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createNewEvent = async (req: Request, res: Response) => {
    console.log(req.body);

    try {
        const { nombre, descripcion, fecha, hora, lugar, estado } = req.body;
        // Convertir fecha a formato ISO-8601
        const isoDate = new Date(fecha).toISOString();
        const newEvent = await createEvent({ nombre, descripcion, fecha: isoDate, hora, lugar, estado });
        res.status(201).json({
            status: 'success',
            data: newEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateExistingEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, fecha, hora, lugar, estado } = req.body;
        const updatedEvent = await updateEvent(Number(id), { nombre, descripcion, fecha, hora, lugar, estado });
        res.status(200).json({
            status: 'success',
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteExistingEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteEvent(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
