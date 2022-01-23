import { visit } from 'unist-util-visit';
import { is, convert } from 'unist-util-is';
import { contractions } from './contractions-list.js'
import { toString } from 'nlcst-to-string'

const sentence = convert('SentenceNode')
const whiteSpace = convert('WhiteSpaceNode')

export default function retextUseContractions() {
  return (tree, file) => {
    // Recursively walk the syntaxt tree of the text
    visit(tree, 'ParagraphNode', (node) => {
      const sentences = node.children
      const source = 'retext-use-contractions'

      // for each sentence
      sentences.forEach((sentence, index) => {
        // for each sentence child
        if (is(sentence, 'SentenceNode')) {
          sentence.children.forEach((sentenceChild, index) => {
              
            const children = sentence.children
            if (
              is(children[index - 1], 'WordNode') &&
              is(sentenceChild, 'WhiteSpaceNode') &&
              is(children[index + 1], 'WordNode')
            ) {
              // if the value of word one equals any of my list
              const firstWord = toString(children[index - 1].children[0])
              const secondWord = toString(children[index + 1].children[0])
              const wordPair = firstWord + ' ' + secondWord
              let expected = ''
              let ruleId = ''

              const matches = contractions.some(contraction => {
                const matchFound = contraction.expanded.some((expansion) => {
                  return expansion.toLowerCase() === wordPair.toLowerCase()
                })
                
                expected = [contraction.contraction.curly]
                ruleId = contraction.id
                return matchFound
              })
              
              if (matches) {
                const actual = toString(children[index - 1]) + toString(sentenceChild) + toString(children[index + 1])
                Object.assign(
                  file.message(
                    `Expected "${expected}" not "${actual}"`,
                    children[index - 1],
                    [source, ruleId].join(':')
                  ),
                  {actual, expected, note: '', url: 'https://one-core.datanerd.us/foundation/design/writing/contractions/'}
                )
                return file
              }
            }
          })
        }
      })
    })
  }
}