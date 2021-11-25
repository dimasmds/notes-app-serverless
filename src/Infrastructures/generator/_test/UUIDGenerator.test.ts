import UUIDGenerator from '../UUIDGenerator';

describe('UUIDGenerator', () => {
  const uuidGenerator = new UUIDGenerator();

  describe('generate', () => {
    it('should return a string', async () => {
      await expect(uuidGenerator.generate()).resolves.toEqual(expect.any(String));
    });

    it('should return a string with length of 36', async () => {
      await expect(uuidGenerator.generate()).resolves.toHaveLength(36);
    });

    it('should return a string with a prefix', async () => {
      await expect(uuidGenerator.generate('User')).resolves.toMatch(/^User/);
    });
  });
});
