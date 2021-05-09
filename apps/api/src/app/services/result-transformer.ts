import { Injectable } from '@nestjs/common';
import { parse } from 'path';
import { IFileSearchResult, IRepoSearchResult } from '@gitgrok/isomorphic';

@Injectable()
export class ResultTransformer {
  transformV2(cwd: string, lines: string[]) {
    return { cwd, lines };
  }

  transform(matches: string, repo: string): IRepoSearchResult {
    const result: IRepoSearchResult = {
      repo,
      path: repo.replace('https://', '').replace('.git', ''),
      matches: [],
      fileList: [],
      lineCount: 0,
    };

    result.matches = matches
      .split('\n\n')
      .map(this.splitFileChunk)
      .map((f) => {
        result.lineCount += f.lines.length;
        f.path = result.path + '/' + f.name;
        Object.assign(f, parse(f.path));

        return f;
      });

    result.fileList = (result.matches || []).map((m) => m.name);

    return result;
  }

  private splitFileChunk(text: string): IFileSearchResult {
    const lines = text.split('\n');

    return {
      name: lines[0],
      lines: lines.slice(1).filter((l) => !!l),
    } as IFileSearchResult;
  }
}
