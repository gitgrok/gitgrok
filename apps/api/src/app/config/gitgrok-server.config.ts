import { Injectable } from '@nestjs/common';
import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String, 'GITGROK_HOME') export class ManifestPath extends Parameter<string> { }
@Env(String, 'GITGROK_HOME') export class HomePath extends Parameter<string> { }
@Env(String, 'GITGROK_PORT') export class GitGrokPort extends Parameter<string> { }

@Injectable()
export class GitgrokServerConfig {
    constructor(
        public readonly manifestPath: ManifestPath,
        public readonly homePath: HomePath,
        public readonly port: GitGrokPort
    ) { }
}