/* eslint-disable no-unused-vars */
interface SecretManager {
  getSecret(secretName: string, secretField: string): Promise<string>;
}

export default SecretManager;
