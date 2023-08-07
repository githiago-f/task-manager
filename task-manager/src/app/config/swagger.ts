import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default (path: string, app: INestApplication) => {
  const doc = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .addBearerAuth({ type: 'http', name: 'bearer', description: 'Authentication type' })
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup(path, app, document);
}