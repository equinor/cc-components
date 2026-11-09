import { existsSync, readFileSync } from 'fs';

/** Reads optional seed values for the app config from the app folder. */
export function readConfigDefaults(path = './app.config.defaults.json') {
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, 'utf-8')) as Record<string, unknown>;
}
