import { Translator } from './core'
import { unitsList } from './units'
import { mock1 } from './mock'

const translatorInstance = new Translator()
unitsList.forEach(item => {
  translatorInstance.registerUnit(item.name as any, item.unit)
})

console.log(JSON.stringify(translatorInstance.translate(null as any, mock1 as any)))