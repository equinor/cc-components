import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { FusionAppGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends FusionAppGeneratorGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: FusionAppGeneratorGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: FusionAppGeneratorGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      serve: {
        executor: 'nx:run-commands',
        options: {
          cwd: `apps/${normalizedOptions.projectName}`,
          commands: [
            {
              command: 'fusion-framework-cli app dev',
            },
          ],
        },
      },
      build: {
        executor: 'nx:run-commands',
        options: {
          cwd: `apps/${normalizedOptions.projectName}`,
          commands: [
            {
              command: 'tsc --noEmit',
            },
          ],
        },
      },
      'build:spa': {
        executor: 'nx:run-commands',
        options: {
          cwd: `apps/${normalizedOptions.projectName}`,
          commands: [
            {
              command: 'fusion-framework-cli app build',
            },
          ],
        },
      },
      version: {
        executor: '@cc-components/plugins:version',
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
