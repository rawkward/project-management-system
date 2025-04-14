import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.import = {
    meta: {
        env: {
            VITE_API_URL: 'http://localhost:3000',
        },
    },
};