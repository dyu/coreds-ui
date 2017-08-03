import { VNodeDirective, VNodeWithData } from '../v2/'
import * as keymage from '../keymage'
import { getPopup, hidePopup } from '../dom_util'
import { defp } from 'coreds/lib/util'

function handle(e) {
    keymage.clearScope()
    hidePopup(getPopup())
}

function keyup(this: any, e) {
    // escape key
    if (e.which === 27 && this.msg) {
        e.stopPropagation()
        this.msg = ''
    }
}

export function inserted(el: any, dir: VNodeDirective, vnode: VNodeWithData) {
    let value = dir.value
    el.addEventListener(dir.arg || 'focusin', handle, true)
    value && el.addEventListener('keyup', defp(el, 'clear', keyup.bind(value)))
}

export function unbind(el: any, dir: VNodeDirective, vnode: VNodeWithData) {
    let clear = el.clear
    el.removeEventListener(dir.arg || 'focusin', handle)
    if (clear) {
        el.removeEventListener('keyup', clear)
        el.clear = null
    }
}

