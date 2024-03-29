/* tslint:disable */
/* eslint-disable */
/**
 * API DOCUMENTATION
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';


/**
 * ReposApi - axios parameter creator
 * @export
 */
export const ReposApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerBranches: async (url: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'url' is not null or undefined
            assertParamExists('repositoryControllerBranches', 'url', url)
            const localVarPath = `/repos/{url}/branches`
                .replace(`{${"url"}}`, encodeURIComponent(String(url)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerDetails: async (url: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'url' is not null or undefined
            assertParamExists('repositoryControllerDetails', 'url', url)
            const localVarPath = `/repos/{url}/details`
                .replace(`{${"url"}}`, encodeURIComponent(String(url)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerList: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/repos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerOpenDir: async (body: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('repositoryControllerOpenDir', 'body', body)
            const localVarPath = `/repos/open-dir`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerOpenRepo: async (url: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'url' is not null or undefined
            assertParamExists('repositoryControllerOpenRepo', 'url', url)
            const localVarPath = `/repos/{url}/open-repo`
                .replace(`{${"url"}}`, encodeURIComponent(String(url)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerTrack: async (body: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('repositoryControllerTrack', 'body', body)
            const localVarPath = `/repos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReposApi - functional programming interface
 * @export
 */
export const ReposApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReposApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerBranches(url: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerBranches(url, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerDetails(url: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerDetails(url, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerList(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerList(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerOpenDir(body: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerOpenDir(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerOpenRepo(url: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerOpenRepo(url, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async repositoryControllerTrack(body: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.repositoryControllerTrack(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ReposApi - factory interface
 * @export
 */
export const ReposApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReposApiFp(configuration)
    return {
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerBranches(url: string, options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerBranches(url, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerDetails(url: string, options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerDetails(url, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerList(options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerList(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerOpenDir(body: object, options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerOpenDir(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} url 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerOpenRepo(url: string, options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerOpenRepo(url, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        repositoryControllerTrack(body: object, options?: any): AxiosPromise<void> {
            return localVarFp.repositoryControllerTrack(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReposApi - object-oriented interface
 * @export
 * @class ReposApi
 * @extends {BaseAPI}
 */
export class ReposApi extends BaseAPI {
    /**
     * 
     * @param {string} url 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerBranches(url: string, options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerBranches(url, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} url 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerDetails(url: string, options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerDetails(url, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerList(options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerList(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerOpenDir(body: object, options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerOpenDir(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} url 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerOpenRepo(url: string, options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerOpenRepo(url, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReposApi
     */
    public repositoryControllerTrack(body: object, options?: AxiosRequestConfig) {
        return ReposApiFp(this.configuration).repositoryControllerTrack(body, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * SearchApi - axios parameter creator
 * @export
 */
export const SearchApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchControllerSearch: async (body: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('searchControllerSearch', 'body', body)
            const localVarPath = `/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} term 
         * @param {string} pathFilter 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchControllerV2: async (term: string, pathFilter: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'term' is not null or undefined
            assertParamExists('searchControllerV2', 'term', term)
            // verify required parameter 'pathFilter' is not null or undefined
            assertParamExists('searchControllerV2', 'pathFilter', pathFilter)
            const localVarPath = `/search/v2/{term}`
                .replace(`{${"term"}}`, encodeURIComponent(String(term)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pathFilter !== undefined) {
                localVarQueryParameter['pathFilter'] = pathFilter;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SearchApi - functional programming interface
 * @export
 */
export const SearchApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SearchApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchControllerSearch(body: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.searchControllerSearch(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} term 
         * @param {string} pathFilter 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchControllerV2(term: string, pathFilter: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.searchControllerV2(term, pathFilter, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SearchApi - factory interface
 * @export
 */
export const SearchApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SearchApiFp(configuration)
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchControllerSearch(body: object, options?: any): AxiosPromise<void> {
            return localVarFp.searchControllerSearch(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} term 
         * @param {string} pathFilter 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchControllerV2(term: string, pathFilter: string, options?: any): AxiosPromise<void> {
            return localVarFp.searchControllerV2(term, pathFilter, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SearchApi - object-oriented interface
 * @export
 * @class SearchApi
 * @extends {BaseAPI}
 */
export class SearchApi extends BaseAPI {
    /**
     * 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchApi
     */
    public searchControllerSearch(body: object, options?: AxiosRequestConfig) {
        return SearchApiFp(this.configuration).searchControllerSearch(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} term 
     * @param {string} pathFilter 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchApi
     */
    public searchControllerV2(term: string, pathFilter: string, options?: AxiosRequestConfig) {
        return SearchApiFp(this.configuration).searchControllerV2(term, pathFilter, options).then((request) => request(this.axios, this.basePath));
    }
}


