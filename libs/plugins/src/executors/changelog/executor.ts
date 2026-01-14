import { ExecutorContext, logger, readJsonFile } from '@nx/devkit';
import { ChangelogExecutorSchema } from './schema';
import * as fs from 'fs';

export default async function runExecutor(
  options: ChangelogExecutorSchema,
  context: ExecutorContext
) {
  if (!options.reason) {
    logger.error('Please provide a changelog reason');
    return {
      success: false,
    };
  }
  const path = `${context.root}/apps/${context.projectName}`;
  const newVersion = readJsonFile(`${path}/package.json`).version;

  const newEntry = `## Version ${newVersion}
${options.reason}\n`;

  try {
    const data = fs.readFileSync(`${path}/CHANGELOG.md`, 'utf8').toString().split('\n');
    data.splice(0, 0, newEntry);
    const newText = data.join('\n');
    fs.writeFileSync(`${path}/CHANGELOG.md`, newText, 'utf8');
  } catch (e) {
    logger.error(`Something failed ${e}`);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
