import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

export class Swagger {
  public static run(app: NestExpressApplication): void {
    const docs: DocumentBuilder = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBasicAuth()
      .addBearerAuth();

    const config: Omit<OpenAPIObject, 'paths'> = docs.build();
    const createSwagger: OpenAPIObject = SwaggerModule.createDocument(
      app,
      config,
    );

    SwaggerModule.setup('/api/v1', app, createSwagger);
  }
}
