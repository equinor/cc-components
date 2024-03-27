const fix = `
var process = {
  env: {
    NODE_ENV: "production"
  }
};
var production = "production";
`;

export const InjectProcessPlugin = {
  name: 'rollup-plugin-metadata',
  renderChunk: (code) => fix + code,
};
