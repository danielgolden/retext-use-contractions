import fs from 'fs'
import {retext} from 'retext'
import {reporter} from 'vfile-reporter-json'
import retextSentenceSpacing from './index.js'

const buffer = fs.readFileSync('example.md')

retext()
  .use(retextSentenceSpacing)
  .process('I can not see you.')
  .then((text) => {
    console.error(reporter(text))
  })