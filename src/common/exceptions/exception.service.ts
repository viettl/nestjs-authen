import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from '@nestjs/common';
// app.service.ts
@Injectable({
  scope: Scope.REQUEST,
})
export class AppService {
  constructor(@Inject(REQUEST) private request: Request) {}

  getUrl(): string {
    return this.request.url;
  }
}
