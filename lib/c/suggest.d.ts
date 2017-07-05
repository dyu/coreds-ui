import { Pager, SelectionFlags } from 'coreds/lib/types';
import { PojoStore } from 'coreds/lib/pstore/';
import * as prk from 'coreds/lib/prk';
export interface PS {
    /** value = 1, required */
    ['1']: string;
    /** end = 2, optional */
    ['2']?: string;
    /** pgstart = 3, optional */
    ['3']?: string;
    /** prk = 4, required */
    ['4']: prk.ParamRangeKey;
}
export declare function $ps_new(value: string, prk: prk.ParamRangeKey, end?: string, pgstart?: string): PS;
export interface ACResult {
    /** name = 1, required */
    ['1']: string;
    /** value = 2, required */
    ['2']: string;
    /** id = 3, optional */
    ['3']?: number;
}
export interface Opts {
    str: string;
    fetch(req: PS): any;
    onSelect(message: ACResult, flags: SelectionFlags): any;
}
export declare function getInstance(): Suggest;
export declare class Suggest {
    pager: Pager;
    pstore: PojoStore<ACResult>;
    opts: Opts;
    cbFetchSuccess: any;
    cbFetchFailed: any;
    constructor();
    static created(self: Suggest): void;
    static mounted(self: Suggest): void;
}
declare const _default: any;
export default _default;
export declare function $customize(tpl_suggest_conrols: string): any;
