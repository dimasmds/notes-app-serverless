import { sign, decode, verify } from 'jsonwebtoken';
import JwtTokenize, { TokenPayload } from '../../Applications/security/JwtTokenize';

class JwtTokenizeImpl implements JwtTokenize {
  async createToken(payload: TokenPayload, secret: string, expiresIn: number): Promise<string> {
    return sign(payload, secret, { expiresIn: 60 * expiresIn });
  }

  async decode(token: string): Promise<TokenPayload> {
    return decode(token) as TokenPayload;
  }

  async verify(token: string, secret: string): Promise<boolean> {
    try {
      await verify(token, secret);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default JwtTokenizeImpl;
