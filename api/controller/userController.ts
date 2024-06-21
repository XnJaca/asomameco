import { Request, Response } from 'express';
import { createUser as createNewUser, getAllUsers, updateUser as updateOneUser } from '../services/userService';
//bcrypt
import bcrypt from 'bcrypt';
export const getUsers = async (req: Request, res: Response) => {
    try {
        console.log('getUsers');

        const users = await getAllUsers();
        return res.status(200).json({
            status: 'success',
            data: users,
        });

    } catch (error) {
        console.log('error', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { nombre, cedula, email, password, telefono, rolId, estado, } = req.body;
        //bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await createNewUser({
            nombre,
            cedula,
            email,
            password: hash,
            telefono,
            rolId,
            estado,
        });
        res.status(201).json({
            status: 'success',
            data: newUser,
        });
    } catch (error) {
        console.log('error', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, cedula, email, password, telefono, rolId, estado, } = req.body;

        //bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await updateOneUser(Number(id), {
            nombre,
            cedula,
            email,
            password: hash,
            telefono,
            rolId,
            estado,
        });
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


