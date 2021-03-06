import { SetOrigin } from '../operations'
import { Handle, AsyncCommand } from 'git-en-boite-message-dispatch'
import { GitDirectory } from '../git_directory'

export const handleSetOrigin: Handle<GitDirectory, AsyncCommand<SetOrigin>> = async (
  repo,
  { url },
) => {
  await repo.exec('remote', ['add', 'origin', url.value])
}
