import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  installPackagesTask,
} from '@nrwl/devkit';
import * as path from 'path';
import { FusionReportGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends FusionReportGeneratorGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  displayName: string;
  reportId: string;
}

function normalizeOptions(
  tree: Tree,
  options: FusionReportGeneratorGeneratorSchema
): NormalizedSchema {
  const name = names(options.appKey.trimEnd()).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir.replace(
    'apps',
    'reports'
  )}/${projectDirectory}`;
  const parsedTags = ['powerbi'];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    reportId: options.reportId.trimEnd(),
    displayName: options.displayName.trimEnd(),
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.appKey),

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

export default async function initGenerator(
  tree: Tree,
  options: FusionReportGeneratorGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);

  return async () => {
    installPackagesTask(tree, true, '.', 'pnpm');
  };
}
