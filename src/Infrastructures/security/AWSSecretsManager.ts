import * as AWS from 'aws-sdk';
import { SecretsManager } from 'aws-sdk';
import SecretManager from '../../Applications/security/SecretManager';
import config from '../../Commons/config';

class AWSSecretsManager implements SecretManager {
  private client: SecretsManager;

  private cachedSecrets: any = {};

  constructor() {
    this.client = new AWS.SecretsManager({
      region: config.awsSdk.region,
    });
  }

  async getSecret(secretName: string, secretField: string): Promise<string> {
    /* istanbul ignore if */
    if (this.cachedSecrets[secretName]) {
      return this.cachedSecrets[secretName];
    }

    const secret = await this.client.getSecretValue({ SecretId: secretName }).promise();
    const secretObject = JSON.parse(secret.SecretString);
    this.cachedSecrets[secretName] = secretObject[secretField];

    return this.cachedSecrets[secretName];
  }
}

export default AWSSecretsManager;
