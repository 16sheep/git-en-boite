import fs from 'fs'
import {
  LocalClones,
  PublishesDomainEvents,
  Repo,
  RepoId,
  InventoryOfRepos,
  NoSuchRepo,
  RepoAlreadyExists,
} from 'git-en-boite-core'
import { RepoPath } from './repo_path'

export class InventoryOfReposOnDisk implements InventoryOfRepos {
  constructor(
    private basePath: string,
    private localClones: LocalClones,
    private domainEvents: PublishesDomainEvents,
  ) {}

  public async create(repoId: RepoId): Promise<Repo> {
    if (await this.exists(repoId)) throw RepoAlreadyExists.forRepoId(repoId)
    const repoPath = RepoPath.for(this.basePath, repoId).value
    return new Repo(repoId, await this.localClones.createNew(repoPath), this.domainEvents)
  }

  public async find(repoId: RepoId): Promise<Repo> {
    if (!(await this.exists(repoId))) throw NoSuchRepo.forRepoId(repoId)
    const repoPath = RepoPath.for(this.basePath, repoId).value
    return new Repo(repoId, await this.localClones.openExisting(repoPath), this.domainEvents)
  }

  public async exists(repoId: RepoId): Promise<boolean> {
    const repoPath = RepoPath.for(this.basePath, repoId).value
    return fs.existsSync(repoPath)
  }
}