import NoteRepository from '../repository/NoteRepository';
import IdGenerator from '../../../Applications/generator/IdGenerator';
import Note from '../entities/Note';

type NoteCreationDependencies = {
  noteRepository: NoteRepository,
  idGenerator: IdGenerator
}

type NoteCreationPayload = {
  title: string
  body: string
  userId: string
}

class NoteCreation {
  private noteRepository: NoteRepository;

  private idGenerator: IdGenerator;

  constructor({ noteRepository, idGenerator }: NoteCreationDependencies) {
    this.noteRepository = noteRepository;
    this.idGenerator = idGenerator;
  }

  async create(payload: NoteCreationPayload) {
    const { title, body, userId } = payload;
    const id = await this.idGenerator.generate('note');
    const createdAt = new Date().toISOString();

    const newNote: Note = {
      id,
      title,
      body,
      userId,
      createdAt,
      updatedAt: createdAt,
      attachments: [],
      archived: false,
    };

    await this.noteRepository.persist(newNote);

    return newNote;
  }
}

export default NoteCreation;
