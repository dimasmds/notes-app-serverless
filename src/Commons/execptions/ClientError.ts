abstract class ClientError extends Error {
  public statusCode: number;

  protected constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ClientError;
