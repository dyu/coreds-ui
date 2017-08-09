import { ParamRangeKey } from 'coreds/lib/prk';
/**
 * ```
 *
 * message ACResult {
 *   required bytes value = 1;
 *   optional uint32 id = 2;
 *   required string name = 3;
 * }
 * ```
 */
export interface ACResult {
    /** value = 1, required */
    ['1']: string;
    /** id = 2, optional */
    ['2']?: number;
    /** name = 3, required */
    ['3']: string;
}
export declare const enum $ {
    /** required: 1 */
    value = "1",
    /** optional: 2 */
    id = "2",
    /** required: 3 */
    name = "3",
}
export declare const enum $0 {
    value = 1,
    id = 2,
    name = 3,
}
export declare function $new(value: string, name: string, id?: number): ACResult;
export declare const $d: {
    $rfbs: number;
    $rfdf: string[];
    $fdf: string[];
    '1': {
        _: number;
        t: number;
        m: number;
        a: number;
        $n: string;
    };
    '2': {
        _: number;
        t: number;
        m: number;
        a: number;
        $n: string;
    };
    '3': {
        _: number;
        t: number;
        m: number;
        a: number;
        $n: string;
    };
    $new: (value: string, name: string, id?: number | undefined) => ACResult;
};
export interface PS {
    /** value = 1, required */
    ['1']: string;
    /** end = 2, optional */
    ['2']?: string;
    /** pgstart = 3, optional */
    ['3']?: string;
    /** prk = 4, required */
    ['4']: ParamRangeKey;
}
export declare function $ps_new(value: string, prk: ParamRangeKey, end?: string, pgstart?: string): PS;
