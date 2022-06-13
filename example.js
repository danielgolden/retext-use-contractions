import fs from 'fs'
import {retext} from 'retext'
import retextUseContractions from './index.js'

retext()
  .use(retextUseContractions)
  .process(`We are certainly correct.`)
  .then((text) => {
    console.error(text)
  })