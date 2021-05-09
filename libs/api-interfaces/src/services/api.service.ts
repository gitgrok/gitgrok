/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Dto } from '../models/dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation repositoryControllerList
   */
  static readonly RepositoryControllerListPath = '/repos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repositoryControllerList()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerList$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.RepositoryControllerListPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repositoryControllerList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerList(params?: {}): Observable<void> {
    return this.repositoryControllerList$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation repositoryControllerTrack
   */
  static readonly RepositoryControllerTrackPath = '/repos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repositoryControllerTrack()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  repositoryControllerTrack$Response(params: {
    body: Dto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.RepositoryControllerTrackPath,
      'put'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repositoryControllerTrack$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  repositoryControllerTrack(params: { body: Dto }): Observable<void> {
    return this.repositoryControllerTrack$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation repositoryControllerBranches
   */
  static readonly RepositoryControllerBranchesPath = '/repos/{url}/branches';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repositoryControllerBranches()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerBranches$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.RepositoryControllerBranchesPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repositoryControllerBranches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerBranches(params?: {}): Observable<void> {
    return this.repositoryControllerBranches$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation repositoryControllerOpenRepo
   */
  static readonly RepositoryControllerOpenRepoPath = '/repos/{url}/open-repo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repositoryControllerOpenRepo()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerOpenRepo$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.RepositoryControllerOpenRepoPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repositoryControllerOpenRepo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  repositoryControllerOpenRepo(params?: {}): Observable<void> {
    return this.repositoryControllerOpenRepo$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation repositoryControllerOpenDir
   */
  static readonly RepositoryControllerOpenDirPath = '/repos/open-dir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repositoryControllerOpenDir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  repositoryControllerOpenDir$Response(params: {
    body: Dto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.RepositoryControllerOpenDirPath,
      'put'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repositoryControllerOpenDir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  repositoryControllerOpenDir(params: { body: Dto }): Observable<void> {
    return this.repositoryControllerOpenDir$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation searchControllerV2
   */
  static readonly SearchControllerV2Path = '/search/v2/{term}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchControllerV2()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchControllerV2$Response(params: {
    pathFilter: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.SearchControllerV2Path,
      'get'
    );
    if (params) {
      rb.query('pathFilter', params.pathFilter, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchControllerV2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchControllerV2(params: { pathFilter: string }): Observable<void> {
    return this.searchControllerV2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation envControllerGetAll
   */
  static readonly EnvControllerGetAllPath = '/e/n//v/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `envControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  envControllerGetAll$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.EnvControllerGetAllPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `envControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  envControllerGetAll(params?: {}): Observable<void> {
    return this.envControllerGetAll$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation envControllerGetOne
   */
  static readonly EnvControllerGetOnePath = '/e/n//v/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `envControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  envControllerGetOne$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiService.EnvControllerGetOnePath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `envControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  envControllerGetOne(params?: {}): Observable<void> {
    return this.envControllerGetOne$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
