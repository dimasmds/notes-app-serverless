import { JwtPayload, verify } from 'jsonwebtoken';
import JwtTokenizeImpl from '../JwtTokenizeImpl';

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
      const decoded = verify(token, 'ssh') as JwtPayload;
      expect(decoded.userId).toEqual(payload.userId);
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });
  });
});
