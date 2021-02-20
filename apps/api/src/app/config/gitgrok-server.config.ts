import { Injectable } from '@nestjs/common';
import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String) export class ManifestPath extends Parameter<string> { }
@Env(String) export class HomePath extends Parameter<string> { }
@Env(String) export class GitGrokPort extends Parameter<string> { }

@Injectable()
export class GitgrokServerConfig {
    constructor(
        public readonly manifestPath: ManifestPath,
        public readonly homePath: HomePath,
        public readonly port: GitGrokPort
    ) { }
}