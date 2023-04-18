export function parsePackageJson(path = './package.json') {
  const blob = fs.readFileSync('./package.json');
  return JSON.parse(blob.toString('utf-8'));
}
