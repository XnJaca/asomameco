import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const login = async (req: Request, res: Response) => {
    console.log('login');

    const { user, password } = req.body;

    try {
        const userAuth = await prisma.user.findFirst({
            include: {
                rol: true,
            },
            where: { cedula: user },
        });

        if (!userAuth) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const isPasswordValid = bcrypt.compareSync(password, userAuth.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: userAuth.id }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            data: userAuth,
            token,
        });
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
