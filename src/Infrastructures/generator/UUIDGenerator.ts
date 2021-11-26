import * as uuid from 'uuid';
import IdGenerator from '../../Applications/generator/IdGenerator';

class UUIDGenerator implements IdGenerator {
  async generate(prefix?: string): Promise<string> {
    if (prefix) return `${prefix}-${uuid.v4()}`;
    return uuid.v4();
  }
}

export default UUIDGenerator;
