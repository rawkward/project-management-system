import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

Object.defineProperty(globalThis, "import", {
    value: {
        meta: {
            env: {
                VITE_API_URL: "http://localhost:3000",
            },
        },
    },
});