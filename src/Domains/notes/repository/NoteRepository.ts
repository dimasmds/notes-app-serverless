/* eslint-disable no-unused-vars */
import Note from '../entities/Note';

interface NoteRepository {
  persist(note: Note): Promise<void>;
  getAllUnarchivedByUser(user: string): Promise<Note[]>;
}

export default NoteRepository;
