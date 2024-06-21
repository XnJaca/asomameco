import { Request, Response } from 'express';
import { getAllRoles } from "../services/roleService";

export const getRoles = async (req: Request, res: Response) => {
    try {
        console.log('getRoles');

        const roles = await getAllRoles();
        return res.status(200).json({
            status: 'success',
            data: roles,
        });

    } catch (error) {
        console.log('error', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
}