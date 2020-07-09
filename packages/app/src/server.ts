import { createWebApp } from 'git-en-boite-client-adapter-web'
import { Application } from 'git-en-boite-client-port'
import { createConfig } from 'git-en-boite-config'
import {
  BackgroundGitRepos,
  BackgroundGitRepoWorker,
  DugiteGitRepo,
} from 'git-en-boite-git-adapter'
import { DiskRepoIndex } from 'git-en-boite-repo-index-adapter'

import { LaBoîte } from './la_boîte'

const config = createConfig(process.env)
console.log(`git-en-boite starting up`)
console.log(`Using config: ${JSON.stringify(config, null, 2)}`)

const gitRepos = new BackgroundGitRepos(DugiteGitRepo, config.redis)
const repoIndex = new DiskRepoIndex(config.git.root, gitRepos)
const app: Application = new LaBoîte(repoIndex, config.version)
BackgroundGitRepoWorker.start(config.redis, DugiteGitRepo)

const port = 3001
const host = 'localhost'
const webApp = createWebApp(app)
webApp.listen(port)
console.log(`Server listening on http://${host}:${port}`)
