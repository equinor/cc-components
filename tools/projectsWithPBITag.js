const fs = require('fs');
const devkit = require('@nrwl/devkit');

(module.exports = () => {
  const projects = [];
  projects.inc;
  const allAppFolders = fs.readdirSync('apps');
  const newOne = allAppFolders.filter((a) => a !== '.gitkeep');
  newOne.forEach((folder) => {
    const project = devkit.readJsonFile(`apps/${folder}/project.json`);
    if (project?.tags.includes('pbi')) {
      projects.push(folder);
    }
  });
  return projects.join(',');
})();
