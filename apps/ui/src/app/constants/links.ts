import { ILink } from '../interfaces/i-link.interface';

export const console: ILink = {
  icon: 'video_label',
  id: 'home',
  label: 'Console',
  slug: 'console',
};

export const repos: ILink = {
  icon: 'group_work',
  id: 'repos',
  label: 'Repositories',
  slug: 'repos',
};

export const search: ILink = {
  icon: 'search',
  id: 'search',
  label: 'Search',
  slug: 'search',
};

export const localStackLink: ILink = {
  icon: 'archive',
  id: 'localStack',
  label: 'localstack',
  slug: 'localstack',
};

export const links: ILink[] = [console, repos, search, localStackLink];
