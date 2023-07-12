type UnitType = 'TaskItem' | 'Container'
interface UnitInput {
  type: UnitType;
  [key: string]: unknown;
}

interface UnitOutput {
  type: UnitType;
  [key: string]: unknown;
}

type UnitClass = new(...arguments_: [Unit, UnitInput, Translator]) => Unit

export abstract class Unit {
  private parentUnit: Unit;
  private input: UnitInput
  private translator: Translator;

  constructor(parentUnit: Unit, input: UnitInput, translator: Translator) {
    this.parentUnit = parentUnit;
    this.input = this.input;
    this.translator = translator;
  }

  abstract parse(): UnitOutput

  parseChild(input: UnitInput) {
    this.translator.translate(this, input)
  }

  parseChildren(inputArr: UnitInput[]) {
    inputArr.forEach(this.parseChild)
  }

  getParentUnit() {
    return this.parentUnit
  }
}

export class Translator {
  private unitsMap: Record<UnitType, UnitClass>

  registerUnit(type: UnitType, unit: UnitClass) {
    if (!this.unitsMap[type]) {
      this.unitsMap[type] = unit
    }
  }

  getUnit(type: UnitType) {
    return this.unitsMap[type]
  }

  deleteUnit(type: UnitType) {
    delete this.unitsMap[type]
  }

  translate(parentUnit: Unit, input: UnitInput) {
    const { type } = input
    const TargetUnit = this.getUnit(type)
    if (!TargetUnit) {
      throw new Error('unit is not exsited')
    }
    return new TargetUnit(parentUnit, input, this).parse()
  }
}