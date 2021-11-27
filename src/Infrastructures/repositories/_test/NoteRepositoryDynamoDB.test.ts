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
        owner: 'user-123',
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
      expect(item.owner).toEqual(note.owner);
      expect(item.collaborators).toEqual(note.collaborators);
    });
  });
});
