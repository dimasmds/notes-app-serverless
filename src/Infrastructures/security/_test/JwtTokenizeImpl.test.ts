import { sign, verify } from 'jsonwebtoken';
import JwtTokenizeImpl from '../JwtTokenizeImpl';
import { TokenPayload } from '../../../Applications/security/JwtTokenize';

describe('JwtTokenizeImpl', () => {
  const jwtTokenizeImpl = new JwtTokenizeImpl();

  describe('createToken', () => {
    it('should create token correctly', async () => {
      // Arrange
      const payload = {
        userId: 'user-123',
      };

      // Action
      const token = await jwtTokenizeImpl.createToken(payload, 'ssh', 60);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toEqual('string');

      // Verify
      const decoded = verify(token, 'ssh') as TokenPayload;
      expect(decoded.userId).toEqual(payload.userId);
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });
  });

  describe('decode', () => {
    it('should decode token correctly', async () => {
      // Arrange
      const token = sign({ foo: 'bar' }, 'secret');

      // Action
      const result = await jwtTokenizeImpl.decode(token) as any;

      // Assert
      expect(result.foo).toEqual('bar');
    });
  });

  describe('verify', () => {
    it('should verify token correctly', async () => {
      // Arrange
      const token = sign({ foo: 'bar' }, 'secret');

      // Action
      const result = await jwtTokenizeImpl.verify(token, 'secret');
      const otherResult = await jwtTokenizeImpl.verify(token, 'otherSecret');

      // Assert
      expect(result).toEqual(true);
      expect(otherResult).toEqual(false);
    });
  });
});
