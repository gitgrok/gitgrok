import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readObjectRx, writeObjectRx } from '@onivoro/server-disk';
import { resolve } from 'path';
import { concatMap } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';

export const swagOn = async (
  app: any,
  outPath = './libs/browser-api/src/lib/',
  doc = 'api'
) => {
  const docPath = resolve(process.cwd(), `${doc}.json`);

  return readObjectRx(resolve(process.cwd(), 'package.json')).pipe(
    concatMap(({ name, version, repository }) => {
      const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(repository)
        .setVersion(version)
        .addTag(version)
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(doc, app, document);
      return writeObjectRx(docPath, document).toPromise();
    }),
    concatMap(() =>
      execRx(`ng-openapi-gen --input ${docPath} --output ${outPath}`)
    )
  );
};
