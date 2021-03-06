import { dirSync } from 'tmp'

import { verifyLocalCloneContract } from './contracts/verifyLocalCloneContract'
import { verifyLocalClonesContract } from './contracts/verifyLocalClonesContract'
import { DirectLocalClone } from '.'

describe(DirectLocalClone.name, () => {
  verifyLocalClonesContract(() => DirectLocalClone)
  verifyLocalCloneContract(() => DirectLocalClone)

  let root: string

  beforeEach(() => (root = dirSync().name))
  afterEach(function () {
    if (this.currentTest.state === 'failed' && this.currentTest.err)
      this.currentTest.err.message = `\nFailed using tmp directory:\n${root}\n${this.currentTest.err?.message}`
  })
})
