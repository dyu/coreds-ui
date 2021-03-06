export interface Opts {
    type: string;
    flags: number;
    focus_ref: string;
    focus_el: any;
    target: any;
    array: any;
    vm: any;
    el: any;
    handler: any;
    keydown: any;
    index: number;
    prevIndex: number | null;
    activeIndex: number;
}
export declare const enum ToggleFlags {
    ESC_ON_PARENT = 1,
    FOCUS_REF_AS_ID = 2
}
export declare function parseOpts(args: string[] | any, target: any, vm: any, el: any): Opts;
export declare function cleanup(opts: Opts): void;
