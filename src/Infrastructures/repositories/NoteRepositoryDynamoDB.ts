import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import client from '../dynamodb/client';
import Note from '../../Domains/notes/entities/Note';
import config from '../../Commons/config';

class NoteRepositoryDynamoDB implements NoteRepository {
  private client: DocumentClient;

  constructor() {
    this.client = client;
  }

  async persist(note: Note): Promise<void> {
    await this.client.put({
      TableName: config.dynamodb.tables.notes.NAME,
      Item: note,
    }).promise();
  }

  async getAllUnarchivedByUser(userId: string): Promise<Note[]> {
    const result = await this.client.query({
      TableName: config.dynamodb.tables.notes.NAME,
      IndexName: config.dynamodb.tables.notes.index.BY_USER_ID,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }).promise();

    return result.Items.filter((item: Note) => !item.archived) as Note[];
  }

  async getAllArchivedByUser(userId: string): Promise<Note[]> {
    const result = await this.client.query({
      TableName: config.dynamodb.tables.notes.NAME,
      IndexName: config.dynamodb.tables.notes.index.BY_USER_ID,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }).promise();

    return result.Items.filter((item: Note) => item.archived) as Note[];
  }
}

export default NoteRepositoryDynamoDB;
