import { ParamRangeKey } from 'coreds/lib/prk';
export interface ACResult {
    /** name = 1, required */
    ['1']: string;
    /** value = 2, required */
    ['2']: string;
    /** id = 3, optional */
    ['3']?: number;
}
export declare const enum $ {
    /** required: 1 */
    name = "1",
    /** required: 2 */
    value = "2",
    /** optional: 3 */
    id = "3",
}
export declare const enum $0 {
    name = 1,
    value = 2,
    id = 3,
}
export declare function $new(name: string, value: string, id?: number): ACResult;
export declare const $d: {
    $rfbs: number;
    $rfdf: string[];
    $fdf: string[];
    '1': {
        _: number;
        t: number;
        m: number;
        a: number;
        $: string;
        $n: string;
    };
    '2': {
        _: number;
        t: number;
        m: number;
        a: number;
        $: string;
        $n: string;
    };
    '3': {
        _: number;
        t: number;
        m: number;
        a: number;
        $: string;
        $n: string;
    };
    $new: (name: string, value: string, id?: number | undefined) => ACResult;
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
