/* eslint-disable no-restricted-syntax,no-await-in-loop */
/* istanbul ignore file */
import client from '../../../dynamodb/client';
import config from '../../../../Commons/config';

const UsersTableDynamoDBHelper = {
  async addUser({ id = 'user-123', username = 'dimasmds', password = 'qwerty123' }: any = {}) {
    await client.put({
      TableName: config.dynamodb.tables.users.NAME,
      Item: {
        id,
        username,
        password,
      },
    }).promise();
  },

  async findUsersById(id: string) {
    const result = await client.query({
      TableName: config.dynamodb.tables.users.NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    }).promise();

    return result.Items;
  },

  async getAll() {
    return client.scan({
      TableName: config.dynamodb.tables.users.NAME,
    }).promise();
  },

  async clean() {
    const users = await this.getAll();

    for (const user of users.Items) {
      await client.delete({
        TableName: config.dynamodb.tables.users.NAME,
        Key: {
          id: user.id,
        },
      }).promise();
    }
  },
};

export default UsersTableDynamoDBHelper;
