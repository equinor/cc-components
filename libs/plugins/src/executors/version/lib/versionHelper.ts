import { readJsonFile, writeJsonFile } from '@nx/devkit';
type Manifest = {
  name: string;
  shortName: string;
  key: string;
  version: {
    major: string;
    minor: string;
    patch: string;
  };
};
type PackageJson = {
  name: string;
  version: `${string}.${string}.${string}`;
  main: string;
  [x: string]: unknown;
};
const compareArr = (arr1: string[], arr2: string[]) => {
  let i = arr1.length;

  while (i--) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const bumpedPkgJsonVersion = (
  oldVersion: PackageJson['version'],
  type: 'patch' | 'minor' | 'major' = 'patch'
): PackageJson['version'] => {
  const splitVersion = oldVersion.split('.');
  if (type === 'major') {
    return `${Number(splitVersion[0]) + 1}.0.0`;
  }
  if (type === 'minor') {
    return `${splitVersion[0]}.${Number(splitVersion[1]) + 1}.0`;
  }
  return `${splitVersion[0]}.${splitVersion[1]}.${Number(splitVersion[2]) + 1}`;
};

export const versionHelper = (root: string, projectName: string | undefined) => {
  const path = `${root}/apps/${projectName}`;

  const appManifestPath = `${path}/app-manifest.json`;
  const packageJsonPath = `${path}/package.json`;

  const manifestFile = readJsonFile<Manifest>(appManifestPath);
  const packageJsonFile = readJsonFile<PackageJson>(packageJsonPath);

  const manifestVersion = manifestFile.version;
  const packageJsonVersion = packageJsonFile.version;

  const bumpVersion = (type: 'patch' | 'minor' | 'major') => {
    if (type === 'patch') {
      const patchManifestVersionNumber = Number(manifestVersion.patch);
      const updated: Manifest = {
        ...manifestFile,
        version: {
          ...manifestVersion,
          patch: `${patchManifestVersionNumber + 1}`,
        },
      };
      const updatedPkgJson: PackageJson = {
        ...packageJsonFile,
        version: bumpedPkgJsonVersion(packageJsonVersion, 'patch'),
      };

      writeJsonFile(appManifestPath, updated);
      writeJsonFile(packageJsonPath, updatedPkgJson);
    }

    if (type === 'minor') {
      const minorManifestVersionNumber = Number(manifestVersion.minor);
      const updated = {
        ...manifestFile,
        version: {
          ...manifestVersion,
          minor: `${minorManifestVersionNumber + 1}`,
          patch: '0',
        },
      };
      const updatedPkgJson: PackageJson = {
        ...packageJsonFile,
        version: bumpedPkgJsonVersion(packageJsonVersion, 'minor'),
      };

      writeJsonFile(appManifestPath, updated);
      writeJsonFile(packageJsonPath, updatedPkgJson);
    }
    if (type === 'major') {
      const majorManifestVersionNumber = Number(manifestVersion.major);
      const updated = {
        ...manifestFile,
        version: {
          major: `${majorManifestVersionNumber + 1}`,
          minor: '0',
          patch: '0',
        },
      };
      const updatedPkgJson: PackageJson = {
        ...packageJsonFile,
        version: bumpedPkgJsonVersion(packageJsonVersion, 'major'),
      };
      writeJsonFile(appManifestPath, updated);
      writeJsonFile(packageJsonPath, updatedPkgJson);
    }
  };

  const checkVersions = () => {
    const maybeNewManifest = readJsonFile<Manifest>(appManifestPath);
    const maybeNewPkgJson = readJsonFile<PackageJson>(packageJsonPath);
    if (
      !compareArr(
        Object.values(maybeNewManifest.version),
        maybeNewPkgJson.version.split('.')
      )
    ) {
      return false;
    }
    return true;
  };

  const pkgJsonToManifestVersion = () => {
    const maybeNewManifestFile = readJsonFile<Manifest>(appManifestPath);
    const maybeNewPackageJsonFile = readJsonFile<PackageJson>(packageJsonPath);
    const versions = maybeNewManifestFile.version;
    const updatedPkgJson: PackageJson = {
      ...maybeNewPackageJsonFile,
      version: `${versions.major}.${versions.minor}.${versions.patch}`,
    };
    writeJsonFile(packageJsonPath, updatedPkgJson);
  };
  const rollback = () => {
    writeJsonFile(packageJsonPath, packageJsonFile);
    writeJsonFile(appManifestPath, manifestFile);
  };
  return {
    bumpVersion,
    checkVersions,
    pkgJsonToManifestVersion,
    rollback,
  };
};
