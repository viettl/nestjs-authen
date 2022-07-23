import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PATH_SWAGGER = 'docs';

export const initSwagger = (app: INestApplication) => {
  const opts = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('Docs')
    .setDescription('Authen')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup(PATH_SWAGGER, app, document);
};
