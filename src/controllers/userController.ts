import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

import bcrypt from 'bcryptjs';


export const CreateUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password : hashPassword
        }
    });
    return res.json(user);
};

export const GetUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.json(users);
};

