import { sign } from 'jsonwebtoken';
import JwtTokenize, { TokenPayload } from '../../Applications/security/JwtTokenize';

class JwtTokenizeImpl implements JwtTokenize {
  async createToken(payload: TokenPayload, secret: string, expiresIn: number): Promise<string> {
    return sign(payload, secret, { expiresIn: 60 * expiresIn });
  }
}

export default JwtTokenizeImpl;
