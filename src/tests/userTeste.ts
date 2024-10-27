import bcrypt from "bcrypt";
import dynamoDB from "../utils/dbConfig"; 
import { TABLE_NAME } from "../constants/constants";

async function createTestUser() {
  const username = "miguel";
  const password = "12345678";
  const passwordHash = await bcrypt.hash(password, 10); 

  const params = {
    TableName: TABLE_NAME,
    Item: {
      username: username,
      password: passwordHash,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log(`Usuário ${username} criado com sucesso!`);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
}

createTestUser();
