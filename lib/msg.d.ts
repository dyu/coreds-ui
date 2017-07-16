import { HasState } from 'coreds/lib/types';
export interface Wrapper {
    _: HasState;
}
export declare function $new(): HasState;
export declare function attachTo(obj: any, field?: string): Wrapper;
export declare function $warning(hs: HasState, msg: string): void;
export declare function $error(hs: HasState, msg: string): void;
export declare function $failed(hs: HasState, err: any): void;
export declare function $success(hs: HasState, msg?: string): void;
export declare function $prepare(hs: HasState): boolean;
export declare function ui(hs: string): string;
