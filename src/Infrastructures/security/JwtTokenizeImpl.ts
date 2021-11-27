import { sign, decode } from 'jsonwebtoken';
import JwtTokenize, { TokenPayload } from '../../Applications/security/JwtTokenize';

class JwtTokenizeImpl implements JwtTokenize {
  async createToken(payload: TokenPayload, secret: string, expiresIn: number): Promise<string> {
    return sign(payload, secret, { expiresIn: 60 * expiresIn });
  }

  async decode(token: string): Promise<TokenPayload> {
    return decode(token) as TokenPayload;
  }
}

export default JwtTokenizeImpl;
