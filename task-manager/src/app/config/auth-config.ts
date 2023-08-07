import { ConfigModule, ConfigType, registerAs } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

export const config = registerAs('auth-config', () => ({
    global: true,
    signOptions:{ 
        expiresIn: process.env.TOKEN_EXPIRATION || '1h',
        issuer: 'task-manager',
        algorithm: 'RS256'
    },
    privateKey: readFileSync(join(cwd(), 'resources', 'privateKey.pem')),
    publicKey: readFileSync(join(cwd(), 'resources', 'publicKey.pem'))
} as JwtModuleOptions));

export default JwtModule.registerAsync({
    inject: [config.KEY],
    imports: [ConfigModule.forFeature(config)],
    useFactory(conf: ConfigType<typeof config>) {
        return conf;
    }
});
