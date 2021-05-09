export interface ISearchState {
  query: string;
  repos: string[] | null;
  results: any;
  pathFilter?: string;
}
