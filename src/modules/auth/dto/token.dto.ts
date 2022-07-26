import { ApiProperty } from '@nestjs/swagger';

export class TokenPayLoadDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  tokenType: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor({
    accessToken,
    refreshToken,
    tokenType,
  }: {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenType = tokenType;
  }
}
