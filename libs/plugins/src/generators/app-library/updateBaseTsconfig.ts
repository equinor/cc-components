import { getWorkspaceLayout, joinPathFragments, Tree, updateJson } from '@nx/devkit';
import { NormalizedSchema } from './schema';

const getRootTsConfigPathInTree = (tree: Tree): string | null => {
  for (const path of ['tsconfig.base.json', 'tsconfig.json']) {
    if (tree.exists(path)) {
      return path;
    }
  }
};

export const updateBaseTsConfig = (host: Tree, options: NormalizedSchema) => {
  updateJson(host, getRootTsConfigPathInTree(host), (json) => {
    const c = json.compilerOptions;
    c.paths = c.paths || {};
    delete c.paths[options.name];

    const { libsDir } = getWorkspaceLayout(host);
    c.paths[options.importPath] = [
      joinPathFragments(libsDir, `${options.projectDirectory}/src/index.ts`),
    ];

    return json;
  });
};
