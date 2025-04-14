import "@testing-library/jest-dom/vitest";
import { TextEncoder, TextDecoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
