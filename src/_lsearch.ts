import { Pager, PagerState, SelectionType } from 'coreds/lib/types'
import { PojoStore } from 'coreds/lib/pstore/'
import search from './sifter'

export const enum Flags {
    SELECT_FROM_PARENT = 8
}

export interface Opts {
    flags: number

    pager: Pager
    fields: string[]
    vm: any
    el: any
    fn: any
    //target?: any
    
    cb: any
    str: string
    array: any
    target_array: any

    change: any
}

export function parseOpts(args: string[]|any, pager: Pager, fields: string[], fn: any/*, target: string|undefined*/, vm ,el): Opts {
    let i = 0,
        len = !args ? 0 : args.length,
        flags = i === len ? 0 : parseInt(args[i++], 10)
    
    let opts: Opts = {
        flags,

        pager,
        fields,
        vm,
        el,
        fn,
        //target,

        cb: typeof fn === 'function' && fn,
        str: '',
        array: null,
        target_array: null,

        change: null
    }

    el.addEventListener('change', opts.change = change.bind(opts))

    return opts
}

export function cleanup(opts: Opts) {
    opts.el.removeEventListener('change', opts.change)
}

function change(this: Opts, e) {
    let el = this.el,
        value = el.value.trim(),
        cb = this.cb,
        pager = this.pager,
        store: PojoStore<any> = pager['store']

    if (value.length !== el.value.length) {
        // the new input has whitespace, replace with trimmed string
        el.value = value
        if (value === this.str) return
    }
    
    if (cb === undefined) {
        this.cb = cb = !this.fn ? null : this.vm[this.fn]
    }
    
    this.str = value
    if (!value) {
        // TODO
        /*if (util.isFlagSet(param, 1)) {

        }*/
        
        cb && cb(0)
        
        pager.state ^= PagerState.LOCAL_SEARCH
        store.replace(this.target_array, SelectionType.RETAIN)
        this.target_array = null
        this.array = null
        return
    }

    if (this.array === null)
        pager.state |= PagerState.LOCAL_SEARCH
    
    // TODO
    /*if (util.isFlagSet(param, 2)) {

    }*/
    
    let target_array = this.target_array
    if (!target_array) {
        this.target_array = target_array = cb && cb(1) || store.array
    }
    
    let result_array = search(value, this, target_array)
    this.array = result_array
    store.replace(result_array, SelectionType.RETAIN)
}
