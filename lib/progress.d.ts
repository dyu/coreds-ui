export interface Opts {
    id?: string;
    color?: string;
    height?: string;
    duration?: number;
}
export declare class ToProgress {
    progress: number;
    options: {
        color: string;
        height: string;
        duration: number;
    };
    opapacity_duration: number;
    el: any;
    listen$$key: any;
    listen$$: any;
    constructor(opts: Opts, parentEl?: any, id?: string);
    show(): void;
    hide(): void;
    transit(): void;
    setProgress(progress: any, callback?: any): void;
    increase(val: any, callback?: any): void;
    decrease(val: any, callback?: any): void;
    reset(callback?: any): void;
    listen(e: any): void;
    finish(callback?: any): void;
}
