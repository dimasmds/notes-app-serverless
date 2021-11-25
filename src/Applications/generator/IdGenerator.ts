/* eslint-disable no-unused-vars */
interface IdGenerator {
  generate(prefix?: string): Promise<string>;
}

export default IdGenerator;
