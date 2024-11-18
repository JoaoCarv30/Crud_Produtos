
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
    } // Verifica se o usuário existe no banco de dados e retorna um erro caso não exista

    const isValidPassword = await compare(password, auth.password); // Compara a senha informada com a senha criptografada no banco de dados

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Senha inválida' });
    } // Verifica se a senha informada é válida e retorna um erro caso não seja

    const token = sign({ id: auth.id }, 'secret', {expiresIn: '1d'}); // Gera um token de autenticação
    const {id} = auth; // Armazena o ID do usuário

    return res.json({id, token}); // Retorna o ID do usuário e o token de autenticação

};