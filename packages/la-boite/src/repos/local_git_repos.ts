import { GitRepos } from './git_repos'
import { GitRepo } from './git_repo'
import { LocalGitRepo } from './local_git_repo'

export class LocalGitRepos implements GitRepos {
  path: string

  constructor(path: string) {
    this.path = path
  }

  findRepo(repoId: string): GitRepo {
    return new LocalGitRepo(repoId)
  }
}
