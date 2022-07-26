import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { initSwagger } from './common/configs/swagger';
import { winstonOptions } from './utils/log';

async function bootstrap() {
  const logger =
    process.env.NODE_ENV === 'production'
      ? WinstonModule.createLogger(winstonOptions)
      : new Logger('Bootstrap Logger');
  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
  };
  const app = await NestFactory.create(AppModule, nestAppOptions);
  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new AllExceptionsFilter());

  // app.useGlobalFilters(new HttpErrorFilter());

  initSwagger(app);
  await app.listen(3000);
  logger.log(`Application listening on port ${3000}`);
}
bootstrap();
