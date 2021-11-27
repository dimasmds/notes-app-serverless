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
}

export default NoteRepositoryDynamoDB;
