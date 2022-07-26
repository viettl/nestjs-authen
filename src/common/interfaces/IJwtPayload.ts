export interface JwtPayload {
  userId: string;
  role?: string;
  tokenType?: string;
}
