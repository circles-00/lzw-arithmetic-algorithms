export interface ILZVAlgorithm {
    encode(text: string): Array<number>
}

export interface IArithmeticCodingAlgorithm {
    encode(text: string, radix: number): IArithmeticEncodedResult
    calculateCumulativeFreq(frequency: Map<string, number>): Map<string, number>
    encodeWithProbabilities(ranges: any, stringToEncode: string): any
}

export interface IDictionary {
    [key: string]: number
}

export interface IArithmeticEncodedResult {
    difference: string
    frequency: Map<string, number>
    power: string,
    lowerBound: string
    upperBound: string
}