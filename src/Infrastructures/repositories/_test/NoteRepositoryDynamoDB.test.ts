import NoteRepositoryDynamoDB from '../NoteRepositoryDynamoDB';
import Note from '../../../Domains/notes/entities/Note';
import NotesTableDynamoDBHelper from './helper/NotesTableDynamoDBHelper';

describe('NoteRepositoryDynamoDB', () => {
  const noteRepository = new NoteRepositoryDynamoDB();

  beforeEach(async () => {
    await NotesTableDynamoDBHelper.clean();
  });

  describe('persist', () => {
    it('should persist a note', async () => {
      // Arrange
      const note: Note = {
        id: 'note-123',
        title: 'title',
        body: 'body',
        createdAt: 'dummy_created_at',
        updatedAt: 'dummy_updated_at',
        archived: false,
        userId: 'user-123',
        collaborators: [],
      };

      // Action
      await noteRepository.persist(note);

      // Assert
      const result = await NotesTableDynamoDBHelper.findNoteById(note.id);
      expect(result.Count).toEqual(1);

      const item = result.Items[0];

      expect(item.id).toEqual(note.id);
      expect(item.title).toEqual(note.title);
      expect(item.body).toEqual(note.body);
      expect(item.createdAt).toEqual(note.createdAt);
      expect(item.updatedAt).toEqual(note.updatedAt);
      expect(item.archived).toEqual(note.archived);
      expect(item.userId).toEqual(note.userId);
      expect(item.collaborators).toEqual(note.collaborators);
    });
  });

  describe('getAllUnarchivedByUser', () => {
    it('should return all unarchived notes by owner', async () => {
      // Arrange
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-123',
        userId: 'user-123',
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-456',
        userId: 'user-123',
        archived: true,
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-789',
        userId: 'user-456',
        archived: true,
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-101112',
        userId: 'user-456',
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-131415',
        userId: 'user-123',
      });

      // Action
      const notes = await noteRepository.getAllUnarchivedByUser('user-123');

      // Assert
      expect(notes.length).toEqual(2);
      expect(notes[0].id).toEqual('note-131415');
      expect(notes[1].id).toEqual('note-123');
    });
  });

  describe('getAllUnarchivedByUser', () => {
    it('should return all archived notes by user id', async () => {
      // Arrange
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-123',
        userId: 'user-123',
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-456',
        userId: 'user-123',
        archived: true,
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-789',
        userId: 'user-456',
        archived: true,
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-101112',
        userId: 'user-456',
      });
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-131415',
        userId: 'user-123',
      });

      // Action
      const notes = await noteRepository.getAllArchivedByUser('user-123');

      // Assert
      expect(notes.length).toEqual(1);
      expect(notes[0].id).toEqual('note-456');
    });
  });

  describe('getNoteById', () => {
    it('should return null if not found', async () => {
      // Action
      const note = await noteRepository.getNoteById('note-123');

      // Assert
      expect(note).toBeNull();
    });

    it('should return note if found', async () => {
      // Arrange
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-123',
        userId: 'user-123',
      });

      // Action
      const note = await noteRepository.getNoteById('note-123');

      // Assert
      expect(note.id).toEqual('note-123');
      expect(note.userId).toEqual('user-123');
    });
  });

  describe('isNoteOwner', () => {
    it('should return false if note not found', async () => {
      // Action
      const isOwner = await noteRepository.isNoteOwner('note-123', 'user-123');

      // Assert
      expect(isOwner).toBeFalsy();
    });

    it('should return false if user not owned the note', async () => {
      // Arrange
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-123',
        userId: 'user-456',
      });

      // Action
      const isOwner = await noteRepository.isNoteOwner('note-123', 'user-123');

      // Assert
      expect(isOwner).toBeFalsy();
    });

    it('should return true if user owned the note', async () => {
      // Arrange
      await NotesTableDynamoDBHelper.addNote({
        id: 'note-123',
        userId: 'user-123',
      });

      // Action
      const isOwner = await noteRepository.isNoteOwner('note-123', 'user-123');

      // Assert
      expect(isOwner).toBeTruthy();
    });
  });
});
