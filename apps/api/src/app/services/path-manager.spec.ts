import { Injectable } from '@nestjs/common';
import { parse } from 'path';
import { HomePath, ManifestPath } from '../config/gitgrok-server.config';
import { PathManager } from './path-manager';
const ng = 'https://github.com/angular/angular-cli.git';
const homePath: HomePath = { value: 'HOMEPATH' } as any;
const manifestPath: ManifestPath = { value: 'MANIFESTPATH' } as any;

describe(PathManager.name, () => {
  describe(PathManager.prototype.extractProjectDirFromUrl.name, () => {
    it.each([[ng]])(
      PathManager.prototype.extractProjectDirFromUrl.name,
      (url: string) => {
        expect(
          new PathManager(homePath, manifestPath).extractProjectDirFromUrl(url)
        ).toMatchSnapshot();
      }
    );
  });

  describe(PathManager.prototype.extractDirToConeInFromUrl.name, () => {
    it.each([[ng]])(
      PathManager.prototype.extractProjectDirFromUrl.name,
      (url: string) => {
        expect(
          new PathManager(homePath, manifestPath).extractDirToConeInFromUrl(url)
        ).toMatchSnapshot();
      }
    );
  });
});
