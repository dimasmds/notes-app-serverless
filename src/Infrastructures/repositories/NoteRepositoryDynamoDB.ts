import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import client from '../dynamodb/client';
import Note from '../../Domains/notes/entities/Note';
import config from '../../Commons/config';
import NoteUpdate from '../../Domains/notes/entities/NoteUpdate';

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

  async getNoteById(id: string): Promise<Note | null> {
    const result = await this.client.query({
      TableName: config.dynamodb.tables.notes.NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    }).promise();

    return result.Count === 0 ? null : result.Items[0] as Note;
  }

  async isNoteOwner(noteId: string, userId: string): Promise<boolean> {
    const note = await this.getNoteById(noteId);
    return !note ? false : note.userId === userId;
  }

  async update(note: NoteUpdate): Promise<void> {
    const {
      id, title, body, archived,
    } = note;

    await this.client.update({
      TableName: config.dynamodb.tables.notes.NAME,
      Key: {
        id,
      },
      UpdateExpression: 'set title = :title, body = :body, archived = :archived',
      ExpressionAttributeValues: {
        ':title': title,
        ':body': body,
        ':archived': archived,
      },
    }).promise();
  }

  async delete(id: string): Promise<void> {
    await this.client.delete({
      TableName: config.dynamodb.tables.notes.NAME,
      Key: {
        id,
      },
    }).promise();
  }

  async addAttachment(id: string, attachmentId: string): Promise<void> {
    await this.client.update({
      TableName: config.dynamodb.tables.notes.NAME,
      Key: {
        id,
      },
      UpdateExpression: 'set #attachments = list_append(if_not_exists(#attachments, :empty_list), :attachment)',
      ExpressionAttributeNames: {
        '#attachments': 'attachments',
      },
      ExpressionAttributeValues: {
        ':attachment': [attachmentId],
        ':empty_list': [],
      },
    }).promise();
  }
}

export default NoteRepositoryDynamoDB;
