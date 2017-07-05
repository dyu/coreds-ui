import { Pager, SelectionFlags } from 'coreds/lib/types';
import { PojoStore } from 'coreds/lib/pstore/';
import * as acr from '../acr';
export interface Opts {
    str: string;
    fetch(req: acr.PS): any;
    onSelect(message: acr.ACResult, flags: SelectionFlags): any;
}
export declare function getInstance(): Suggest;
export declare class Suggest {
    pager: Pager;
    pstore: PojoStore<acr.ACResult>;
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
