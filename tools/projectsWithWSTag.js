const fs = require('fs');
const devkit = require('@nrwl/devkit');
const allAppFolders = fs.readdirSync('apps');
const projects = [];
const newOne = allAppFolders.filter((a) => a !== '.gitkeep');
newOne.forEach((folder) => {
  const project = devkit.readJsonFile(`apps/${folder}/project.json`);
  if (project?.tags.includes('ws')) {
    projects.push(folder);
  }
});
const p = projects.join(',');
// This conole log with p as argument actually makes this work. Try to remove it
console.log(p);
module.exports = p;
