export interface FusionAppGeneratorGeneratorSchema {
  name: string;
  tags: 'ws' | 'pbi' | (string & unknown);
  directory?: string;
}
