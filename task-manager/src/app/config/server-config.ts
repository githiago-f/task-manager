import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const httpsOptionsFactory = () => {
    try {
        return ({
            cert: readFileSync(join(cwd(), 'resources', 'cert.pem')),
            key: readFileSync(join(cwd(), 'resources', 'key.pem'))
        });
    } catch (e) {
        return undefined;
    }
};

export default registerAs('server-config', () => ({
    sslPort: process.env.SSL_PORT,
    appPort: process.env.APP_PORT,
    swaggerPath: process.env.SWAGGER_PATH || 'docs'
}));
