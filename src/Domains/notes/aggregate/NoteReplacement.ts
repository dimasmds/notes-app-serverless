import NoteRepository from '../repository/NoteRepository';

type NoteReplacementDependencies = {
  noteRepository: NoteRepository,
}

type NoteReplacementPayload = {
  id: string,
  userId: string
  title: string,
  body: string,
  archived: boolean,
}

class NoteReplacement {
  private noteRepository: NoteRepository;

  constructor({ noteRepository } : NoteReplacementDependencies) {
    this.noteRepository = noteRepository;
  }

  async replace({
    id,
    userId,
    title,
    body,
    archived,
  } : NoteReplacementPayload) {
    const currentNote = await this.noteRepository.getNoteById(id);

    if (!currentNote) throw new Error('NOTE_REPLACEMENT.NOTE_NOT_FOUND');
    if (currentNote.userId !== userId) throw new Error('NOTE_REPLACEMENT.USER_NOT_OWNER');

    await this.noteRepository.update({
      id,
      title,
      body,
      archived,
    });
  }
}

export default NoteReplacement;
