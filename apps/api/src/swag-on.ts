import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeObjectRx } from '@onivoro/server-disk';
import { resolve } from 'path';
export const swagOn = async (app) => {
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const name = 'api';
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(name, app, document);
    await writeObjectRx(resolve(process.cwd(), `${name}.json`), document).toPromise();
    return app;
}