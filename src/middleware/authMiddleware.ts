import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Extrai o token do cabeçalho Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.warn("Token não fornecido"); // Log para token ausente
    res.sendStatus(403);
    return;
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    req.user = decoded;
    console.log("Usuário autenticado:", req.user); // Confirma que o usuário foi autenticado
    next();
  } catch (err) {
    console.error("Erro ao verificar o token:", err); // Log detalhado do erro
    res.sendStatus(403);
  }
};

export default authenticateJWT;
