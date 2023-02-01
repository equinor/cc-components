export interface AppLibraryGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
}
export type NormalizedSchema = AppLibraryGeneratorSchema & {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  importPath: string;
  parsedTags: string[];
};
