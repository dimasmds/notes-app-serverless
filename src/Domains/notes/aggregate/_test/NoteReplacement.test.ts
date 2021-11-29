import NoteRepository from '../../repository/NoteRepository';
import NoteReplacement from '../NoteReplacement';

describe('NoteReplacement', () => {
  const mockNoteRepository = <NoteRepository>{};
  const noteReplacement = new NoteReplacement({
    noteRepository: mockNoteRepository,
  });

  describe('replace', () => {
    it('should throw error when note not found', async () => {
      // Arrange
      const payload = {
        id: 'note-123',
        userId: 'user-123',
        title: 'dummy_title',
        body: 'dummy_body',
        archived: false,
      };
      mockNoteRepository.getNoteById = jest.fn(() => Promise.resolve(null));

      // Action & Assert
      await expect(noteReplacement.replace(payload)).rejects.toThrowError('NOTE_REPLACEMENT.NOTE_NOT_FOUND');
      expect(mockNoteRepository.getNoteById).toHaveBeenCalledWith(payload.id);
    });

    it('should throw error when user not owned the note', async () => {
      // Arrange
      const payload = {
        id: 'note-123',
        userId: 'user-123',
        title: 'dummy_title',
        body: 'dummy_body',
        archived: false,
      };

      mockNoteRepository.getNoteById = jest.fn(() => Promise.resolve({
        id: 'note-123',
        userId: 'user-456',
        title: 'dummy_title',
        body: 'dummy_body',
        archived: false,
        updatedAt: 'dummy_updated_at',
        createdAt: 'dummy_created_at',
        attachments: [],
      }));

      // Action & Assert
      await expect(noteReplacement.replace(payload)).rejects.toThrowError('NOTE_REPLACEMENT.USER_NOT_OWNER');
    });

    it('should update note correctly', async () => {
      // Arrange
      const payload = {
        id: 'note-123',
        userId: 'user-123',
        title: 'dummy_title',
        body: 'dummy_body',
        archived: false,
      };

      mockNoteRepository.getNoteById = jest.fn(() => Promise.resolve({
        id: 'note-123',
        userId: 'user-123',
        title: 'dummy_title',
        body: 'dummy_body',
        archived: false,
        updatedAt: 'dummy_updated_at',
        createdAt: 'dummy_created_at',
        attachments: [],
      }));

      mockNoteRepository.update = jest.fn(() => Promise.resolve());

      // Action
      await noteReplacement.replace(payload);

      // Assert
      expect(mockNoteRepository.getNoteById).toHaveBeenCalledWith(payload.id);
      expect(mockNoteRepository.update).toHaveBeenCalledWith({
        ...payload,
        userId: undefined,
      });
    });
  });
});
