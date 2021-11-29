/* eslint-disable no-unused-vars */
interface StorageService {
  getPutPreSignedUrl(key: string) : Promise<string>;
}

export default StorageService;
