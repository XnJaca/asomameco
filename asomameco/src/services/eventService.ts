import api from '../api/axios';
import { IEvent, IEventCreate } from '../interfaces/event';


export const getAllEvents = async (): Promise<IEvent[]> => {
    const token = localStorage.getItem("token");
    const response = await api.get('events', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const events: IEvent[] = response.data.data;

    return events;
};

export const createEvent = async (newEvent: IEventCreate): Promise<void> => {
    const token = localStorage.getItem("token");
    console.log(newEvent);

    const response = await api.post('events', newEvent, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;

};

export const updateEventApi = async (updatedEvent: IEvent): Promise<void> => {
    const token = localStorage.getItem("token");

    const response = await api.put(`events/${updatedEvent.id}`, updatedEvent, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;
};

export const deleteEventApi = async (eventId: number): Promise<void> => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`events/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);

    return response.data;
};
