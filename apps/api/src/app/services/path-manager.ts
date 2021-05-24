import { Injectable } from '@nestjs/common';
import { parse } from 'path';
import { HomePath, ManifestPath } from '../config/gitgrok-server.config';

@Injectable()
export class PathManager {
  constructor(
    private readonly homePath: HomePath,
    private readonly manifestPath: ManifestPath
  ) {}

  getManifestPath() {
    return this.manifestPath;
  }

  getHomeDirectory(scmProviderPath?: string): string {
    return `${this.homePath.value}/${scmProviderPath || ''}/`.replace(
      '//',
      '/'
    );
  }

  extractDirToConeInFromUrl(url: string): string {
    return parse(`${this.homePath.value}/${url.split('https://')[1]}`).dir;
  }

  extractProjectDirFromUrl(url: string): string {
    const dir = this.extractDirToConeInFromUrl(url);
    const segments = url.split('/');
    return `${dir}/${segments[segments.length - 1].replace('.git', '')}`;
  }
}
