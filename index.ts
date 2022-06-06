import {default as LZWAlgorithm} from './LZVAlgorithm'
import ArithmeticCodingAlgorithm from "./ArithmeticCodingAlgorithm";

// Testing LZW
const lzwStringToEncode = '/TAN/HAN/HAN/AN/'
console.log(`*** Testing LZWAlgorithm encoding with string: ${lzwStringToEncode}\n`, 'Result:', LZWAlgorithm.get().encode(lzwStringToEncode))

// Testing Arithmetic Coding with change of radix
const arithmeticStringToEncode = 'DABDDB'
const radix = 10
console.log(`*** Testing Arithmetic encoding with change of radix with string: ${arithmeticStringToEncode}\n`, 'Result:', ArithmeticCodingAlgorithm.get().encode(arithmeticStringToEncode, radix))


// Testing Arithmetic Coding with probabilities
// TODO: Make probability and STRING Mapping automatic
const stringToEncode = 'MULTI'
const stringBasedOnProbabilities: string = 'ULTMI'
const probabilities: Array<number> = [0.3, 0.3, 0.2, 0.1, 0.1]

const arr: any = {}
let range_from = 0


/* Example Output of data structure:
* {
  U: { prob: 0.3, range_from: 0, range_to: 0.3 },
  L: { prob: 0.3, range_from: 0.3, range_to: 0.6 },
  T: { prob: 0.2, range_from: 0.6, range_to: 0.8 },
  M: { prob: 0.1, range_from: 0.8, range_to: 0.9 },
  I: { prob: 0.1, range_from: 0.9, range_to: 1 }
}
* */

probabilities.map((element, idx) => {
    arr[stringBasedOnProbabilities[idx]] = {}
    arr[stringBasedOnProbabilities[idx]]['prob'] = element
    arr[stringBasedOnProbabilities[idx]]['range_from'] = range_from
    arr[stringBasedOnProbabilities[idx]]['range_to'] = range_from + arr[stringBasedOnProbabilities[idx]]['prob']
    range_from = arr[stringBasedOnProbabilities[idx]]['range_to']
})

console.log(`*** Testing Arithmetic encoding with probabilities with string: ${stringToEncode}\n`, 'Result:', ArithmeticCodingAlgorithm.get().encodeWithProbabilities(arr, stringToEncode))
