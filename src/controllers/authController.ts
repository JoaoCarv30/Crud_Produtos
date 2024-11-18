
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';



export const Authcontroller = async (req: Request, res: Response) => {


    const { email, password } = req.body;

    const auth = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!auth) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = await compare(password, auth.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = sign({ id: auth.id }, 'secret', {expiresIn: '1d'});
    const {id} = auth;

    return res.json({id, token});

};