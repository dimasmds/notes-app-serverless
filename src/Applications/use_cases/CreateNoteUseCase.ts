import UseCaseDependencies from './definitions/UseCaseDependencies';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import JwtTokenize from '../security/JwtTokenize';
import IdGenerator from '../generator/IdGenerator';
import NoteCreation from '../../Domains/notes/aggregate/NoteCreation';

type UseCasePayload = {
  title: string
  body: string
  token: string
}

class CreateNoteUseCase {
  private readonly noteRepository: NoteRepository;

  private readonly jwtTokenize: JwtTokenize;

  private readonly idGenerator: IdGenerator;

  constructor({ noteRepository, jwtTokenize, idGenerator }: UseCaseDependencies) {
    this.noteRepository = noteRepository;
    this.jwtTokenize = jwtTokenize;
    this.idGenerator = idGenerator;
  }

  async execute({ title, body, token }: UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);

    const noteCreation = new NoteCreation({
      noteRepository: this.noteRepository,
      idGenerator: this.idGenerator,
    });

    return noteCreation.create({
      title,
      body,
      userId,
    });
  }
}

export default CreateNoteUseCase;
