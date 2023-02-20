export interface VersionExecutorSchema {
  type: 'patch' | 'minor' | 'major';
  reason: string;
} // eslint-disable-line
