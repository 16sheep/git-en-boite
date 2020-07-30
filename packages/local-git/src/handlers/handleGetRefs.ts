import { AsyncQuery, Handle } from 'git-en-boite-message-dispatch'
import { Ref } from 'git-en-boite-core'
import { GetRefs } from '../operations'
import { GitDirectory } from '../git_directory'

export const handleGetRefs: Handle<GitDirectory, AsyncQuery<GetRefs, Ref[]>> = async repo => {
  try {
    const { stdout } = await repo.execGit('show-ref')
    return stdout
      .trim()
      .split('\n')
      .map(line => line.trim().split(' '))
      .map(([revision, name]) => new Ref(revision, name))
  } catch (error) {
    return []
  }
}