import { extractMsg } from 'coreds/lib/util';
export function $new() {
    return { state: 0, msg: '' };
}
export function attachTo(obj, field) {
    var hs = $new();
    obj._ = hs;
    if (field) {
        obj[field] = null;
        hs[field] = null;
    }
    return obj;
}
export function $warning(hs, msg) {
    hs.state = 4 /* WARNING */;
    hs.msg = msg;
}
export function $error(hs, msg) {
    hs.state = 2 /* ERROR */;
    hs.msg = msg;
}
export function $failed(hs, err) {
    return $error(hs, extractMsg(err));
}
export function $success(hs, msg) {
    if (msg) {
        hs.state = 1 /* SUCCESS */;
        hs.msg = msg;
    }
    else {
        hs.state = 0;
    }
}
export function $prepare(hs) {
    if ((hs.state & 8 /* LOADING */))
        return false;
    if (hs.msg)
        hs.msg = '';
    hs.state = 8 /* LOADING */;
    return true;
}
export function ui(hs) {
    return "\n<div :class=\"'ui msg status-' + (" + hs + ".state & " + 7 /* MASK_STATUS */ + ")\" v-show=\"" + hs + ".msg\">\n  <i class=\"icon close\" @click.prevent=\"" + hs + ".msg = null\"></i>\n  <span v-text=\"" + hs + ".msg\"></span>\n</div>\n"; /**/
}
//# sourceMappingURL=msg.js.map