import { IDictionary, ILZVAlgorithm } from "./types";

class LZVAlgorithm implements ILZVAlgorithm {
    private static instance: LZVAlgorithm

    constructor() {
    }

    static get() {
        if (!LZVAlgorithm.instance) {
            LZVAlgorithm.instance = new LZVAlgorithm()
        }
        return LZVAlgorithm.instance
    }

    encode(text: string) {
        let INITIAL_DICTIONARY_SIZE: number = 256;
        const dict: IDictionary = {}

        for(let i=0; i<INITIAL_DICTIONARY_SIZE; i++) {
            dict[String(String.fromCharCode(i)).toString()] = i
        }

        let foundChars: string = ''
        const result: Array<number> = []

        for (const character of text) {
            const charsToAdd: string = foundChars + character
            if (Object.keys(dict).includes(charsToAdd)) {
                foundChars = charsToAdd
            } else {
                result.push(dict[foundChars])
                dict[charsToAdd] = INITIAL_DICTIONARY_SIZE++
                foundChars = character.toString()
            }
        }


        if (foundChars !== '') {
            result.push(dict[foundChars])
        }

        return result
    }
}

export default LZVAlgorithm