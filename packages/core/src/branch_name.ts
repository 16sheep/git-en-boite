import { TinyTypeOf } from 'tiny-types'

export class BranchName extends TinyTypeOf<string>() {
  protected constructor(value: string) {
    super(value)
  }

  static of(name: string): BranchName {
    return new BranchName(name)
  }

  toString(): string {
    return this.value
  }
}
