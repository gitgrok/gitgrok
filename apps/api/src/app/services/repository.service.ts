import { Injectable, Logger } from '@nestjs/common';
import { readObjectRx, writeObjectRx } from '@onivoro/server-disk';
import { execRx } from '@onivoro/server-process';
import { resolve } from 'path';
import { of } from 'rxjs';
import { catchError, concatMap, defaultIfEmpty, map, tap } from 'rxjs/operators';
import { ManifestPath } from '../config/gitgrok-server.config';
import { PathManager } from './path-manager';

@Injectable()
export class RepositoryService {
  openDir(dir: string) {
    return execRx(`code ${dir}`);
  }
  openRepo(url: string) {
    const at = this.pathManager.extractProjectDirFromUrl(url);
    return execRx(`code ${at}`);
  }
  listBranches(url: string) {
    const cwd = this.pathManager.extractProjectDirFromUrl(url);
    return execRx(`git branch`, { cwd });
  }
  ls(url: string) {
    const dir = this.pathManager.extractProjectDirFromUrl(url);
    return execRx(`ls ${dir}`);
  }
  getDetail(url: string) {
    return this.ls(url).pipe(
      concatMap(filesAndFolders => this.listBranches(url).pipe(
        map(branches => ({
          branches, filesAndFolders
        }))))
    );
  }

  logger = new Logger(RepositoryService.name);

  constructor(
    private readonly manifestPath: ManifestPath,
    private readonly pathManager: PathManager
  ) { }

  list() {
    return readObjectRx(this.manifestPath.value).pipe(
      catchError(e => of(e).pipe(map(() => ([])))),
    );
  }

  track(url: string) {
    return this.clone(url).pipe(
      tap(() => this.logger.log('about to upate manifest')),
      concatMap(() => this.updateManifest(url))
    );
  }

  private updateManifest(url) {
    return this.list().pipe(
      tap((d) => this.logger.log(d)),
      concatMap((list) =>
        writeObjectRx(
          this.manifestPath.value,
          this.dedup([...list, url].sort())
        )
          .pipe(map(() => list))
      )
    );
  }

  private dedup(arr: string[]) {
    const output = {};
    arr.forEach((k) => {
      output[k] = 1;
    });
    return Object.keys(output);
  }

  private clone(url: string) {
    const cwd = this.pathManager.extractDirToConeInFromUrl(url);
    const project = this.pathManager.extractProjectDirFromUrl(url);
    const target = resolve(cwd, project);
    const cloneCmd = `git clone ${url} ${target}`;
    return execRx(`cd ${cwd} && ${cloneCmd}`).pipe(
      catchError(() =>
        execRx(`mkdir -p ${cwd} && ${cloneCmd}`, undefined, true).pipe(
          catchError((e) => of(e))
        )
      ),
      defaultIfEmpty(() => ({}))
    );
  }
}
