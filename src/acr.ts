import { ParamRangeKey } from 'coreds/lib/prk'

export interface ACResult {
    /** name = 1, required */
    ['1']: string
    /** value = 2, required */
    ['2']: string
    /** id = 3, optional */
    ['3']?: number
}
export const enum $ {
    /** required: 1 */
    name = '1',
    /** required: 2 */
    value = '2',
    /** optional: 3 */
    id = '3'
}
export const enum $0 {
    name = 1,
    value = 2,
    id = 3
}
export function $new(name: string, value: string, id?: number): ACResult {
    return {
        '1': name,
        '2': value,
        '3': id
    }
}
export const $d = {
    $rfbs: 1, $rfdf: ['1'],
    $fdf: ['1','3'],
    '1': {_: 1, t: 3, m: 2, a: 0, $: 'name', $n: 'Name'},
    '2': {_: 2, t: 2, m: 2, a: 0, $: 'value', $n: 'Value'},
    '3': {_: 3, t: 10, m: 1, a: 0, $: 'id', $n: 'Id'},
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