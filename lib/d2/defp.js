import { defp } from 'coreds/lib/util';
export function bind(el, dir, vnode) {
    if (!dir.arg) {
        console.warn('arg is required for v-defp.');
    }
}
export function inserted(el, dir, vnode) {
    if (dir.arg)
        defp(el, dir.arg, dir.value);
}
//export function update(el: any, dir: VNodeDirective, vnode: VNodeWithData) {}
//export function unbind(el: any, dir: VNodeDirective, vnode: VNodeWithData) {}
//# sourceMappingURL=defp.js.map