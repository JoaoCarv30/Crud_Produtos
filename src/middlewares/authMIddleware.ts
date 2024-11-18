import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers; // Obtém o token de autorização do cabeçalho da requisição
    if (!authorization) {
        res.status(401).json({ error: "Token not provided" });
        return;
    } // Verifica se o token foi informado

    const [, token] = authorization.split(" "); // Divide o token em duas partes, onde a primeira é o tipo e a segunda é o token em si

    try {
        const decoded = verify(token, "secret"); // Verifica se o token é válido
        const { id } = decoded as TokenPayload;  // Obtém o ID do usuário do token
        console.log(id);

        req.userId = id; // Adiciona o ID do usuário na requisição
        next(); // Continua a execução da requisição
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};