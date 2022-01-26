import fs from 'fs'
import {retext} from 'retext'
import retextUseContractions from './index.js'

retext()
  .use(retextUseContractions)
  .process('I can not see you.')
  .then((text) => {
    console.error(text.messages[0].position)
  })