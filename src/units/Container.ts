import { Unit, UnitOutput } from '../core'
export class Container extends Unit {
  parse(): UnitOutput {
    return {
      ...this.input,
      props: {
        ...(this.input.prop as any),
        newProps: 1
      },
      children: Array.isArray(this.input.children) ? this.parseChildren(this.input.children) : this.parseChild(this.input.children as any)
    }
  }
}