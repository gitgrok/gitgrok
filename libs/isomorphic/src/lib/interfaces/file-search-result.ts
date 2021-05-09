import { ParsedPath } from './parsed-path.interface';

export interface IFileSearchResult extends ParsedPath {
  path: string;
  lines: string[];
}
