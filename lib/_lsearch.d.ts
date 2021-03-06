import { Pager } from 'coreds/lib/types';
export declare const enum Flags {
    SELECT_FROM_PARENT = 8
}
export interface Opts {
    flags: number;
    pager: Pager;
    fields: string[];
    vm: any;
    el: any;
    fn: any;
    cb: any;
    str: string;
    array: any;
    target_array: any;
    change: any;
}
export declare function parseOpts(args: string[] | any, pager: Pager, fields: string[], fn: any, vm: any, el: any): Opts;
export declare function cleanup(opts: Opts): void;
