import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config'; // Ajuste o caminho conforme necessário

// Dados que você quer incluir no payload do JWT
const payload = {
  username: 'testuser', // Coloque um nome de usuário de teste ou qualquer outro dado que desejar
};

// Gerar o token
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

console.log('Generated JWT:');
console.log(token);
