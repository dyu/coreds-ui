import { removeClass, addClass, resolveElementArray } from './dom_util'

export interface Opts {
    type: string
    flags: number
    focus_id: string
    focus_el: any

    target: any
    array: any
    vm: any
    el: any
    
    handler: any
    keydown: any
    index: number
    prevIndex: number | null
    activeIndex: number
}

export const enum ToggleFlags {
    ESC_ON_PARENT = 1
}

export function parseOpts(args: string[]|any, target: any, vm, el): Opts {
    let i = 0,
        len = !args ? 0 : args.length,
        type = i === len ? 'click' : args[i++],
        flags = i === len ? 0 : parseInt(args[i++], 10),
        focus_id = i === len ? '' : args[i++]
    
    let opts: Opts = {
        type,
        flags,
        focus_id,
        focus_el: null,

        target,
        array: null,
        vm,
        el,
        
        handler: null,
        keydown: null,
        index: 0,
        prevIndex: null,
        activeIndex: -1
    }

    opts.handler = handler.bind(opts)
    el.addEventListener(type, opts.handler)
    if ((flags & ToggleFlags.ESC_ON_PARENT))
        el.parentElement.addEventListener('keydown', (opts.keydown = keydown.bind(opts)))
    return opts
}

export function cleanup(opts: Opts) {
    opts.el.removeEventListener(opts.type, opts.handler)
    opts.keydown && opts.el.parentElement.removeEventListener('keydown', opts.keydown)
}

function handler(this: Opts, e) {
    e && e.preventDefault()

    let self = this,
        array = self.array,
        vm = self.vm,
        el

    if (!array)
        self.array = array = resolveElementArray(self.el, self.target, vm)
    
    if (self.prevIndex !== null) {
        el = array[self.prevIndex]
        if (removeClass(el, 'active') && 1 === array.length) {
            self.activeIndex = -1
            return
        }
    }

    self.prevIndex = self.activeIndex = self.index
    el = array[self.index]

    if (1 === array.length) {
        // non-rotating index
    } else if (++self.index === array.length) {
        self.index = 0
    }
    
    addClass(el, 'active')
    if (this.focus_el) {
        this.focus_el.focus()
    } else if (this.focus_id) {
        this.focus_el = document.getElementById(this.focus_id)
        this.focus_id = ''
        this.focus_el && this.focus_el.focus()
    }
}

function keydown(this: Opts, e) {
    // escape key
    if (e.which === 27 && this.activeIndex !== -1) handler.call(this)
}
