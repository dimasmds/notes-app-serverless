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
  owner: string
}

class NoteCreation {
  private noteRepository: NoteRepository;

  private idGenerator: IdGenerator;

  constructor({ noteRepository, idGenerator }: NoteCreationDependencies) {
    this.noteRepository = noteRepository;
    this.idGenerator = idGenerator;
  }

  async create(payload: NoteCreationPayload) {
    const { title, body, owner } = payload;
    const id = await this.idGenerator.generate('note');
    const createdAt = new Date().toISOString();

    const newNote: Note = {
      id,
      title,
      body,
      owner,
      createdAt,
      updatedAt: createdAt,
      collaborators: [],
      archived: false,
    };

    await this.noteRepository.persist(newNote);

    return newNote;
  }
}

export default NoteCreation;
