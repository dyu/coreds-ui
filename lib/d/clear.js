import * as keymage from '../keymage';
import { getPopup, hidePopup } from '../dom_util';
import { defp } from 'coreds/lib/util';
function handle(e) {
    keymage.clearScope();
    hidePopup(getPopup());
}
function keydown(e) {
    // escape key
    if (e.which === 27 && this.msg) {
        e.stopPropagation();
        this.msg = '';
    }
}
export function bind() {
    this.el.addEventListener(this.arg || 'focusin', handle, true);
}
export function update(value, oldValue) {
    !oldValue && value && this.el.addEventListener('keydown', defp(this.el, 'clear', keydown.bind(value)));
}
export function unbind() {
    var el = this.el, clear = el.clear;
    el.removeEventListener(this.arg || 'focusin', handle);
    if (clear) {
        el.removeEventListener('keydown', clear);
        el.clear = null;
    }
}
//# sourceMappingURL=clear.js.map