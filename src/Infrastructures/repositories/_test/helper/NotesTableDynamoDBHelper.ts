/* istanbul ignore file */

import client from '../../../dynamodb/client';
import config from '../../../../Commons/config';

const NotesTableDynamoDBHelper = {
  async addNote({
    id = 'note-123',
    title = 'Test note',
    body = 'Test body',
    userId = 'user-123',
    collaborators = [],
    archived = false,
    updatedAt = 'dummy_updated_at',
    createdAt = 'dummy_created_at',
  } : any = {}) {
    const params = {
      TableName: config.dynamodb.tables.notes.NAME,
      Item: {
        id,
        title,
        body,
        userId,
        collaborators,
        archived,
        updatedAt,
        createdAt,
      },
    };

    await client.put(params).promise();
  },
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
