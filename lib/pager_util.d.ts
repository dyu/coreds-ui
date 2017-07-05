import { Pager } from 'coreds/lib/types';
import { PojoStore } from 'coreds/lib/pstore/';
export declare function selectIdx(idx: number, array: any[], store: PojoStore<any>, flags: number): void;
export declare function pageAndSelectIdx(page: number, idx: number, array: any[], store: PojoStore<any>, flags: number): void;
export declare function listUp(pager: Pager, index_selected: number, e: Event, flags: number): void;
export declare function listDown(pager: Pager, index_selected: number, e: Event, flags: number): void;
export declare function tableUp(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableJumpUp(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableDown(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableJumpDown(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableLeft(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableJumpLeft(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableRight(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export declare function tableJumpRight(pager: Pager, col_size: number, table_flags: number, idx: number, e: Event, flags: number): void;
export interface Opts {
    col_size: number;
    table_flags: number;
    flags: number;
}
export declare function moveTopOrUp(e: any, pager: Pager, opts: Opts): void;
export declare function moveBottomOrDown(e: any, pager: Pager, opts: Opts): void;
export declare function pageFirst(e: any, pager: Pager, opts: Opts): void;
export declare function pageLast(e: any, pager: Pager, opts: Opts): void;
export declare function pageSort(e: any, pager: any, opts: Opts): void;
export declare function pageNewer(e: any, pager: any, opts: Opts): void;
export declare function pageOlder(e: any, pager: any, opts: Opts): void;
export declare function pageReload(e: any, pager: any, opts: Opts): void;
export declare function pagePrevOrLoad(e: any, pager: any, flags: number): void;
export declare function pageNextOrLoad(e: any, pager: Pager, flags: number): void;
export declare function moveLeft(e: any, pager: Pager, opts: Opts): void;
export declare function moveRight(e: any, pager: Pager, opts: Opts): void;
