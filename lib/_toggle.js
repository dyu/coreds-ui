import { removeClass, addClass, resolveElementArray } from './dom_util';
export function parseOpts(args, target, vm, el) {
    var i = 0, len = !args ? 0 : args.length, type = i === len ? 'click' : args[i++], flags = i === len ? 0 : parseInt(args[i++], 10), focus_ref = i === len ? '' : args[i++];
    var opts = {
        type: type,
        flags: flags,
        focus_ref: focus_ref,
        focus_el: null,
        target: target,
        array: null,
        vm: vm,
        el: el,
        handler: null,
        keydown: null,
        index: 0,
        prevIndex: null,
        activeIndex: -1
    };
    opts.handler = handler.bind(opts);
    el.addEventListener(type, opts.handler);
    if ((flags & 1 /* ESC_ON_PARENT */))
        el.parentElement.addEventListener('keydown', (opts.keydown = keydown.bind(opts)));
    return opts;
}
export function cleanup(opts) {
    opts.el.removeEventListener(opts.type, opts.handler);
    opts.keydown && opts.el.parentElement.removeEventListener('keydown', opts.keydown);
}
function handler(e) {
    e && e.preventDefault();
    var self = this, array = self.array, vm = self.vm, el;
    if (!array)
        self.array = array = resolveElementArray(self.el, self.target, vm);
    if (self.prevIndex !== null) {
        el = array[self.prevIndex];
        if (removeClass(el, 'active') && 1 === array.length) {
            self.activeIndex = -1;
            return;
        }
    }
    self.prevIndex = self.activeIndex = self.index;
    el = array[self.index];
    if (1 === array.length) {
        // non-rotating index
    }
    else if (++self.index === array.length) {
        self.index = 0;
    }
    addClass(el, 'active');
    if (this.focus_el) {
        this.focus_el.focus();
    }
    else if (this.focus_ref) {
        this.focus_el = !(this.flags & 2 /* FOCUS_REF_AS_ID */) ?
            this.vm.$refs[this.focus_ref] : document.getElementById(this.focus_ref);
        this.focus_ref = '';
        this.focus_el && this.focus_el.focus();
    }
}
function keydown(e) {
    // escape key
    if (e.which === 27 && this.activeIndex !== -1)
        handler.call(this);
}
//# sourceMappingURL=_toggle.js.map