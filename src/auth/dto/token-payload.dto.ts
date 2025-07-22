export class TokenPayloadDto {
  sub: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
