import { createConfig } from 'git-en-boite-config'
import { fulfilled, hasProperty, matchesPattern, promiseThat, rejected } from 'hamjest'

import { RepoFactory } from './'
import { BackgroundGitRepos } from './background_git_repos'
import { verifyRepoContract } from './contracts/verify_repo_contract'
import { verifyRepoFactoryContract } from './contracts/verify_repo_factory_contract'
import { DugiteGitRepo } from './dugite_git_repo'

const config = createConfig()

describe(BackgroundGitRepos.name, () => {
  context('when a worker is running', () => {
    let gitRepos: BackgroundGitRepos
    before(async function () {
      gitRepos = await BackgroundGitRepos.connect(DugiteGitRepo, config.redis)
      await gitRepos.startWorker()
    })
    after(async () => await gitRepos.close())

    const openRepo = (path: string) => gitRepos.openGitRepo(path)

    const repoFactory = new RepoFactory()
    verifyRepoFactoryContract(openRepo, repoFactory.open)
    verifyRepoContract(openRepo, repoFactory.open)
  })

  context('checking for running workers', () => {
    let gitRepos: BackgroundGitRepos

    beforeEach(async function () {
      gitRepos = await BackgroundGitRepos.connect(DugiteGitRepo, config.redis)
    })

    afterEach(async () => {
      await gitRepos.close()
    })

    it('throws an error when no workers are running', async () => {
      const pinging = gitRepos.pingWorkers(1)
      await promiseThat(
        pinging,
        rejected(hasProperty('message', matchesPattern('No workers responded'))),
      )
    })

    // Skipping because having both of these seems to leave a hanging promise, sometimes
    it('succeeds when a worker is running', async () => {
      await gitRepos.startWorker()
      const pinging = gitRepos.pingWorkers(100)
      await promiseThat(pinging, fulfilled())
    })
  })

  context('connecting', () => {
    it('throws an error if the redis connection cannot be established', async () => {
      const badRedisOptions = 'redis://localhost:1234'
      const connecting = BackgroundGitRepos.connect(DugiteGitRepo, badRedisOptions)
      await promiseThat(connecting, rejected())
    })
  })
})
