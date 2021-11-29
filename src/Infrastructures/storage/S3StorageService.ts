import { S3 } from 'aws-sdk';
import StorageService from '../../Applications/storage/StorageService';
import createS3Client from './s3/client';
import config from '../../Commons/config';

class S3StorageService implements StorageService {
  private client: S3;

  constructor() {
    this.client = createS3Client();
  }

  async getPutPreSignedUrl(key: string): Promise<string> {
    return this.client.getSignedUrlPromise('putObject', {
      Bucket: config.s3.buckets.attachments.NAME,
      Key: key,
      Expires: Number(config.s3.SIGNED_URL_EXPIRATION),
    });
  }
}

export default S3StorageService;
