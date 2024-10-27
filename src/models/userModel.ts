import { TABLE_NAME } from "../constants/constants";
import dynamoDB from "../utils/dbConfig";

interface User {
  username: string;
  password: string;
}

const UserModel = {
  getUserByUsername: async (
    username: string
  ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> => {
    const params = {
      TableName: TABLE_NAME,
      Key: { username },
    };
    return dynamoDB.get(params).promise();
  },

  updateUserPassword: async (
    username: string,
    passwordHash: string
  ): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> => {
    const params = {
      TableName: TABLE_NAME,
      Key: { username },
      UpdateExpression: "set passwordHash = :passwordHash",
      ExpressionAttributeValues: { ':passwordHash': passwordHash }
    };
    return dynamoDB.update(params).promise()
  },
};

export default UserModel;
