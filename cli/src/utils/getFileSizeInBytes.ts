import fs from 'fs';

export function getFilesize(filename: string, unit: 'b' | 'kb' | 'mb' = 'mb') {
  const fileSizeInBytes = fs.statSync(filename).size;
  switch (unit) {
    case 'b':
      return fileSizeInBytes;
    case 'kb':
      return Number((fileSizeInBytes / 1024).toPrecision(2));
    case 'mb':
      return Number((fileSizeInBytes / (1024 * 1024)).toPrecision(2));
  }
}
