export interface JwtPayload {
  user_id: string;
  role?: string;
  tokenType?: string;
}
