import { IBranch } from './branch.interface';
import { IRepo } from './repo';
import { ISearchCriteria } from './search-criteria';

export interface IRepoSearchCriteria {
  repo: IRepo;
  branch: IBranch;
  search: ISearchCriteria;
}
