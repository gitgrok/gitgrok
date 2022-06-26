import {ReposApi, SearchApi} from '../../../../libs/generated-api/src/lib';

const config = {basePath: 'http://localhost:7777', isJsonMime: () => true};

export const reposApi = new ReposApi(config);
export const searchApi = new SearchApi(config);
