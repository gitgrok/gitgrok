import {IFileSearchResult} from "./file-search-result";

export interface IRepoSearchResult {
    fileList: string[];
    lineCount: number;
    matches: IFileSearchResult[];
    path:  string;
    repo: string;
}