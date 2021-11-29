import UseCaseDependencies from './definitions/UseCaseDependencies';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import JwtTokenize from '../security/JwtTokenize';
import NoteDeletion from '../../Domains/notes/aggregate/NoteDeletion';

type UseCasePayload = {
  id: string,
  token: string,
}

class DeleteNoteUseCase {
  private readonly noteRepository: NoteRepository;

  private jwtTokenize: JwtTokenize;

  constructor({ noteRepository, jwtTokenize } : UseCaseDependencies) {
    this.noteRepository = noteRepository;
    this.jwtTokenize = jwtTokenize;
  }

  async execute({ id, token }: UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);

    const noteDeletion = new NoteDeletion({
      noteRepository: this.noteRepository,
    });

    await noteDeletion.delete({
      id,
      userId,
    });
  }
}

export default DeleteNoteUseCase;
