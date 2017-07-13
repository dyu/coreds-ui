import * as keymage from '../keymage';
import { getPopup, hidePopup } from '../dom_util';
import { defp } from 'coreds/lib/util';
function handle(e) {
    keymage.clearScope();
    hidePopup(getPopup());
}
function keyup(e) {
    // escape key
    if (e.which === 27 && this.msg)
        this.msg = '';
}
export function inserted(el, dir, vnode) {
    var value = dir.value;
    el.addEventListener(dir.arg || 'focusin', handle, true);
    value && el.addEventListener('keyup', defp(el, 'clear', keyup.bind(value)));
}
export function unbind(el, dir, vnode) {
    var clear = el.clear;
    el.removeEventListener(dir.arg || 'focusin', handle);
    if (clear) {
        el.removeEventListener('keyup', clear);
        el.clear = null;
    }
}
//# sourceMappingURL=clear.js.map