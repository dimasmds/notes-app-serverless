/* eslint-disable no-unused-vars */
import Note from '../entities/Note';
import NoteUpdate from '../entities/NoteUpdate';

interface NoteRepository {
  persist(note: Note): Promise<void>;
  getAllUnarchivedByUser(userId: string): Promise<Note[]>;
  getAllArchivedByUser(userId: string): Promise<Note[]>;
  isNoteOwner(noteId: string, userId: string): Promise<boolean>;
  getNoteById(id: string): Promise<Note | null>;
  update(note: NoteUpdate): Promise<void>;
  delete(id: string): Promise<void>;
}

export default NoteRepository;
