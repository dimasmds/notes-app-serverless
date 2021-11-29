import UseCaseDependencies from './definitions/UseCaseDependencies';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import JwtTokenize from '../security/JwtTokenize';
import NoteReplacement from '../../Domains/notes/aggregate/NoteReplacement';

type UseCasePayload = {
  id: string,
  title: string,
  body: string,
  archived: boolean,
  token: string,
}

class UpdateNoteUseCase {
  private readonly noteRepository: NoteRepository;

  private jwtTokenize: JwtTokenize;

  constructor({ noteRepository, jwtTokenize } : UseCaseDependencies) {
    this.noteRepository = noteRepository;
    this.jwtTokenize = jwtTokenize;
  }

  async execute({
    id, title, body, archived, token,
  }: UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);

    const noteReplacement = new NoteReplacement({
      noteRepository: this.noteRepository,
    });

    await noteReplacement.replace({
      id, title, body, userId, archived,
    });
  }
}

export default UpdateNoteUseCase;
