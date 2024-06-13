import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const register = async (req: Request, res: Response) => {
    const { nombre, cedula, email, password, telefono, rolId, estado } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await prisma.user.create({
            data: {
                nombre,
                cedula,
                email,
                password: hash,
                telefono,
                rolId,
                estado,
            },
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
