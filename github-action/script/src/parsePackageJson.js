import fs from 'fs';
export function parsePackageJson(path = './package.json') {
    const blob = fs.readFileSync(path);
    return JSON.parse(blob.toString('utf-8'));
}
