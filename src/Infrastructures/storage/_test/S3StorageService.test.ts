import S3StorageService from '../S3StorageService';

describe('S3StorageService', () => {
  const s3StorageService = new S3StorageService();

  describe('getPutPreSignedUrl', () => {
    it('should create put pre-signed url correctly', async () => {
      const url = await s3StorageService.getPutPreSignedUrl('test-key');
      expect(typeof url).toEqual('string');
      expect(url).toContain('https://');
    });
  });
});
