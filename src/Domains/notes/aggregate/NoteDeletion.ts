import NoteRepository from '../repository/NoteRepository';

type NoteDeletionDependencies = {
  noteRepository: NoteRepository
}

type NoteDeletionPayload = {
  id: string
  userId: string
}

class NoteDeletion {
  private noteRepository: NoteRepository;

  constructor({ noteRepository } : NoteDeletionDependencies) {
    this.noteRepository = noteRepository;
  }

  async delete({ id, userId }: NoteDeletionPayload) {
    const note = await this.noteRepository.getNoteById(id);

    if (note === null) throw new Error('NOTE_DELETION.NOTE_NOT_FOUND');

    if (note.userId !== userId) throw new Error('NOTE_DELETION.NOT_OWNER');

    await this.noteRepository.delete(id);
  }
}

export default NoteDeletion;
