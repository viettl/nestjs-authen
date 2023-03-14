import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  private readonly db_url;

  constructor(@Inject('CONFIGURATION_OPTIONS') private options) {
    this.db_url = options.db_url;
  }

  getDBUrl(): string {
    return this.db_url;
  }
}
