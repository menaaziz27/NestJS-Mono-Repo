export interface UserJwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
