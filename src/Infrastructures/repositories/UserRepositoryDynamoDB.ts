import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import UserRepository from '../../Domains/users/repository/UserRepository';
import client from '../dynamodb/client';
import User from '../../Domains/users/entities/User';
import NewUser from '../../Domains/users/entities/NewUser';
import config from '../../Commons/config';

class UserRepositoryDynamoDB implements UserRepository {
  private client: DocumentClient;

  constructor() {
    this.client = client;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const result = await this.client.query({
      TableName: config.dynamodb.tables.users.NAME,
      IndexName: config.dynamodb.tables.users.index.BY_USERNAME,
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    }).promise();

    return result.Count === 0;
  }

  async persist(user: NewUser): Promise<User> {
    await this.client.put({
      TableName: config.dynamodb.tables.users.NAME,
      Item: {
        ...user,
      },
    }).promise();

    const { id, username } = user;
    return {
      id,
      username,
    };
  }
}

export default UserRepositoryDynamoDB;
