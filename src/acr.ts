import { ParamRangeKey } from 'coreds/lib/prk'

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
    ['1']: string
    /** id = 2, optional */
    ['2']?: number
    /** name = 3, required */
    ['3']: string
}
export const enum $ {
    /** required: 1 */
    value = '1',
    /** optional: 2 */
    id = '2',
    /** required: 3 */
    name = '3'
}
export const enum $0 {
    value = 1,
    id = 2,
    name = 3
}
export function $new(value: string, name: string, id?: number): ACResult {
    return {
        '1': value,
        '2': id,
        '3': name
    }
}
export const $d = {
    $rfbs: 4, $rfdf: ['3'],
    $fdf: ['2','3'],
    '1': {_: 1, t: 2, m: 2, a: 0, $n: 'Value'},
    '2': {_: 2, t: 10, m: 1, a: 0, $n: 'Id'},
    '3': {_: 3, t: 3, m: 2, a: 0, $n: 'Name'},
    $new
}

export interface PS {
    /** value = 1, required */
    ['1']: string
    /** end = 2, optional */
    ['2']?: string
    /** pgstart = 3, optional */
    ['3']?: string
    /** prk = 4, required */
    ['4']: ParamRangeKey
}
export function $ps_new(value: string, prk: ParamRangeKey, end?: string, pgstart?: string): PS {
    return {
        '1': value,
        '2': end,
        '3': pgstart,
        '4': prk
    }
}
