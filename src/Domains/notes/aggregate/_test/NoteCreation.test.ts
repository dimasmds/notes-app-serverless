import NoteRepository from '../../repository/NoteRepository';
import IdGenerator from '../../../../Applications/generator/IdGenerator';
import NoteCreation from '../NoteCreation';

describe('NoteCreation', () => {
  const mockNoteRepository = <NoteRepository>{};
  const mockIdGenerator = <IdGenerator>{};

  const noteCreation = new NoteCreation({
    noteRepository: mockNoteRepository,
    idGenerator: mockIdGenerator,
  });

  describe('create', () => {
    it('should persist new note and return it', async () => {
      // Arrange
      const payload = {
        title: 'new note',
        body: 'body note',
        user: 'user-123',
      };

      const expectedNewNote = {
        id: 'note-123',
        title: 'new note',
        body: 'body note',
        user: 'user-123',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        collaborators: [],
        archived: false,
      };

      mockNoteRepository.persist = jest.fn(() => Promise.resolve());
      mockIdGenerator.generate = jest.fn((prefix: string) => Promise.resolve(`${prefix}-123`));

      // Action
      const newNote = await noteCreation.create(payload);

      // Assert
      expect(newNote).toEqual(expectedNewNote);
      expect(mockNoteRepository.persist).toBeCalledWith(expectedNewNote);
      expect(mockIdGenerator.generate).toBeCalledWith('note');
    });
  });
});
