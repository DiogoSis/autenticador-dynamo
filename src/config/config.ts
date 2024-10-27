import crypto from "crypto";

// Função para gerar uma nova chave JWT
const generateJWTSecret = (): string => {
  return crypto.randomBytes(32).toString("base64");
};

// Checar se o JWT_SECRET já está configurado
const JWT_SECRET = process.env.JWT_SECRET || generateJWTSecret();

// Exibe a chave gerada caso não exista uma já definida
if (!process.env.JWT_SECRET) {
  console.log("Generated new JWT_SECRET:");
  console.log(JWT_SECRET);
}

// Exporta a chave JWT
export { JWT_SECRET };
