import { Unit, UnitOutput } from '../core'
export class Text extends Unit {
  parse(): UnitOutput {
    return {
      ...this.input,
      props: {
        ...(this.input.props as any),
        newProps: 1
      }
    }
  }
}