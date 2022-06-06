import {IArithmeticCodingAlgorithm} from "./types";

class ArithmeticCodingAlgorithm implements IArithmeticCodingAlgorithm {
    private static instance: ArithmeticCodingAlgorithm

    constructor() {
    }

    static get() {
        if (!ArithmeticCodingAlgorithm.instance) {
            ArithmeticCodingAlgorithm.instance = new ArithmeticCodingAlgorithm()
        }
        return ArithmeticCodingAlgorithm.instance
    }

    calculateCumulativeFreq(frequency: Map<string, number>) {
        let total = 0;
        const cf: Map<string, number> = new Map();
        for (let i = 0; i < 256; i++) {
            const c = String.fromCharCode(i);
            if (frequency.has(c)) {
                const v = frequency.get(c);
                cf.set(c, total);
                total += v || 0;
            }
        }
        return cf;
    }

    // Using change of radix
    encode(text: string, radix: number) {
        const frequency: Map<string, number> = new Map();

        for (let i = 0; i < text.length; i++) {
            const c: string = text[i].toString();
            if (frequency.has(c)) frequency.set(c, (frequency.get(c) || 0) + 1);
            else frequency.set(c, 1);
        }

        const cumulativeFrequency: Map<string, number> = this.calculateCumulativeFreq(frequency);
        const base: bigint = BigInt(text.length);
        let lower: bigint = BigInt(0);
        let pf: bigint = BigInt(1);

        for (let i = 0; i < text.length; i++) {
            const c: string = text[i].toString();
            const x: bigint = BigInt((cumulativeFrequency.get(c) || 0));
            lower = lower * base + x * pf;
            pf = pf * BigInt((frequency.get(c) || 0));
        }

        let upper = lower + pf;
        let power = 0n;
        const bigRadix: bigint = BigInt(radix);
        while (true) {
            pf = pf / bigRadix;
            if (pf === 0n) break;
            power++;
        }
        const difference: bigint = (upper - 1n) / (bigRadix ** power)

        return {
            difference: difference.toString(10),
            frequency,
            power: power.toString(10),
            lowerBound: lower.toString(10),
            upperBound: upper.toString(10)
        }
    }

    // Using probabilities
    encodeWithProbabilities(ranges: any, stringToEncode: string) {
        let lowerBound: number = 0.0
        let higherBound: number = 1.0

        stringToEncode.split('').map((value) => {
            const difference = higherBound - lowerBound
            higherBound = lowerBound + difference * ranges[value]?.range_to
            lowerBound = lowerBound + difference * ranges[value]?.range_from
        })

        return {lowerBound: +Number(lowerBound).toFixed(7), higherBound: +Number(higherBound).toFixed(7)}
    }

}

export default ArithmeticCodingAlgorithm