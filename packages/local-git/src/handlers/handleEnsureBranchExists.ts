import { AsyncCommand, Handle } from 'git-en-boite-message-dispatch'
import { EnsureBranchExists } from '../operations'
import { GitDirectory } from '../git_directory'

export const handleEnsureBranchExists: Handle<
  GitDirectory,
  AsyncCommand<EnsureBranchExists>
> = async (repo, { name }) => {
  const branches: string[] = await (
    await repo.execGit('branch', ['--list', '--format=%(refname:short)'])
  ).stdout
    .trim()
    .split('\n')
  if (!branches.includes(name)) await repo.execGit('branch', [name, 'HEAD'])
  // await repo.execGit('checkout', [name])
}