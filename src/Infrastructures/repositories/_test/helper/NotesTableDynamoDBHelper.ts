/* istanbul ignore file */

import client from '../../../dynamodb/client';
import config from '../../../../Commons/config';

const NotesTableDynamoDBHelper = {
  async findNoteById(id: string) {
    return client.query({
      TableName: config.dynamodb.tables.notes.NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    }).promise();
  },
  async getAll() {
    return client.scan({
      TableName: config.dynamodb.tables.notes.NAME,
    }).promise();
  },
  async clean() {
    const notes = await this.getAll();

    const deletePromises = notes.Items.map((note) => client.delete({
      TableName: config.dynamodb.tables.notes.NAME,
      Key: {
        id: note.id,
      },
    }).promise());

    await Promise.all(deletePromises);
  },
};

export default NotesTableDynamoDBHelper;
