import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dynamoClient from "../utils/dbConfig";
import { JWT_SECRET } from "../config/config"; // Importa a chave JWT
import { TABLE_NAME } from "../constants/constants";

const AuthService = {
  login: async (username: string, password: string): Promise<string> => {
    const params = {
      TableName: TABLE_NAME,
      Key: { username },
    };

    const { Item } = await dynamoClient.get(params).promise();

    if (!Item || !(await bcrypt.compare(password, Item.password))) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = jwt.sign({ username: Item.username }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  },

  changePassword: async (username: string, currentPassword: string, newPassword: string) => {
    const params = {
      TableName: TABLE_NAME,
      Key: { username },
    };

    const { Item } = await dynamoClient.get(params).promise();

    if (!Item || !(await bcrypt.compare(currentPassword, Item.password))) {
      throw new Error("Senha atual incorreta");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await dynamoClient.update({
      TableName: TABLE_NAME,
      Key: { username },
      UpdateExpression: "set password = :password",
      ExpressionAttributeValues: {
        ":password": newHashedPassword,
      },
    }).promise();
  },
};

export default AuthService;
