import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { resolve } from "path";
import { readFile, writeFile } from "fs/promises";
import { INestApplication } from "@nestjs/common";

export async function initOpenapi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('')
    .setVersion(JSON.parse(await readFile('./package.json', 'utf-8')).version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await writeFile(resolve(`api.json`), JSON.stringify(document, null, 2));
}