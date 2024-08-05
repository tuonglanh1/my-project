import { config } from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';

export const getEnvFilePath = (NODE_ENV: string) => {
    const joinPath = (path: string) => join(cwd(), 'config', path);
    switch (NODE_ENV) {
        case 'dev':
        case 'development':
            return joinPath('.env.dev');
        case 'local':
            return joinPath('.env.local');
        case 'uat':
            return joinPath('.env.uat');
        case 'prod':
            return joinPath('.env.prod');
        default:
            return joinPath('.env');
    }
};

config({ path: getEnvFilePath(process.env['NODE' + '_ENV']) });
