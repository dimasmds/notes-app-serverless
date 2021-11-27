/* eslint-disable no-unused-vars */
export type TokenPayload = {
  userId: string
  iss?: string
  sub?: string
  iat?: number
  exp?: number
}

interface JwtTokenize {
  createToken(payload: TokenPayload, secret: string, expiresIn: number) : Promise<string>
  decode(token: string) : Promise<TokenPayload>
}

export default JwtTokenize;
