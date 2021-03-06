import { nextTick } from 'coreds/lib/util'
import { SelectionType, SelectionFlags } from 'coreds/lib/types'
//import { ds } from 'coreds/lib/ds/'
import * as rpc from 'coreds/lib/rpc/'
import * as prk from 'coreds/lib/prk'
import * as acr from './acr'
//import * as keymage from './keymage'
import { getInstance } from './c/suggest'
import { Keys, removeClass, addClass, debounce, getPopup, hidePopup, showPopup, visiblePopup } from './dom_util'
import {
    pageFirst, pageLast, pagePrevOrLoad, pageNextOrLoad,
    listDown, listUp, moveTopOrUp, moveBottomOrDown
} from './pager_util'

function showSuggest(suggest, self: Opts, popup?: any) {
    suggest.pstore.replace(self.cache, SelectionType.RESET)
    suggest.opts = self
    showPopup(popup || getPopup(), suggest.$el, self.el)
}
function toggleSuggest(suggest, self: Opts, p?: any): boolean {
    let popup = p || getPopup(),
        show = true,
        array
    
    if (hidePopup(popup)) {
        show = false
    } else if ((array = self.cache).length) {
        if (!suggest.pstore.isSameArray(array))
            suggest.pstore.replace(array, SelectionType.RESET)
        suggest.opts = self
        showPopup(popup, suggest.$el, self.el)
    }
    
    return show
}

export const enum Flags {
    UPDATE = 16,
    CBFN_AFTER_SET = 32,
    CBFN_ON_UNSET = 64
}

export interface Opts {
    opts: any
    flags: number
    pojo: any
    field: string
    fetch: any
    cbfn: any
    fk: string
    vm: any
    el: any
    pojo_: any
    selected: any

    col_size: number
    table_flags: number

    update: boolean
    str: string
    str_fetch: string
    disabled: boolean
    cache: any

    pending_name: any
    pending_value: any

    unwatch: any
    onSelect: any

    cbFetchSuccess: any
    cbFetchFailed: any

    // next tick
    focusNT: any
    //hideSuggestNT: any

    // listeners
    //focusin: any
    focusout: any
    click: any
    input: any
    keydown: any
}

const emptyArray = []
//var current: Opts, previous: Opts

function newWatchFn(pojo_, fk) {
    return function() {
        return pojo_[fk]
    }
}

function onUpdate(this: Opts, value, oldValue) {
    this.el.value = value
    if (value)
        addClass(this.el.parentElement, 'suggested')
    else
        removeClass(this.el.parentElement, 'suggested')
}

function focusNT(this: Opts) {
    this.el.focus()
}

function onSelect(this: Opts, message: acr.ACResult, flags: SelectionFlags) {
    let self = this,
        valueKey = this.opts.vk,
        name = message[acr.$.name],
        value = valueKey ? message[valueKey] : (message[acr.$.id] || message[acr.$.value])
    
    if (!flags) {
        self.selected = message
        self.pending_name = name
        self.pending_value = value
        self.el.value = name
    } else if (name === self.pojo_[self.fk]) {
        self.pending_name = null
        self.el.value = name // redundant
        addClass(this.el.parentElement, 'suggested')
        nextTick(self.focusNT)
    } else if ((this.flags & Flags.CBFN_AFTER_SET) && this.cbfn) {
        self.pending_name = null
        self.pojo_[self.fk] = name
        self.pojo[self.field] = value
        nextTick(self.focusNT)
        this.cbfn(self.field, value, message)
    } else if (!this.cbfn || this.cbfn(self.field, value, message)) {
        self.pending_name = null
        self.pojo_[self.fk] = name
        self.pojo[self.field] = value
        nextTick(self.focusNT)
    } else {
        self.pending_name = null
        nextTick(self.focusNT)
    }
}

function postPS(this: string, req: acr.PS, opts: Opts) {
    return rpc.post(this, JSON.stringify(req))
}

export function parseOpts(args: string[]|any, value, vm, el): Opts {
    let i = 0,
        len = !args ? 0 : args.length,
        flags = i === len ? 0 : parseInt(args[i++], 10),
        pojo = value.pojo,
        field = value.field as string,
        fetch = value.fetch,
        cbfn = value.onSelect,
        pojo_ = pojo._,
        fk = field
    
    if (!pojo_) {
        pojo_ = pojo
        fk += '$'
    }

    let opts = {
        opts: value,
        flags,
        pojo,
        field,
        fetch: typeof fetch === 'string' ? postPS.bind(fetch) : fetch,
        cbfn,
        fk,
        vm,
        el,
        pojo_,
        selected: null,

        col_size: 0,
        table_flags: 0,

        update: 0 !== (flags & Flags.UPDATE),
        str: '',
        str_fetch: '',
        disabled: false,
        cache: emptyArray,

        pending_name: null,
        pending_value: null,

        unwatch: null,
        onSelect: null,

        cbFetchSuccess: null,
        cbFetchFailed: null,

        focusNT: null,
        //hideSuggestNT: null,
        //focusin: null,
        focusout: null,
        click: null,
        input: null,
        keydown: null
    }

    opts.unwatch = vm.$watch(newWatchFn(pojo_, fk), onUpdate.bind(opts))
    opts.onSelect = onSelect.bind(opts)

    opts.cbFetchSuccess = cbFetchSuccess.bind(opts)
    opts.cbFetchFailed = cbFetchFailed.bind(opts)

    opts.focusNT = focusNT.bind(opts)
    //opts.hideSuggestNT = hideSuggestNT.bind(opts)

    //el.addEventListener('focusin', opts.focusin = focusin.bind(opts))
    el.addEventListener('focusout', opts.focusout = focusout.bind(opts))
    el.addEventListener('click', opts.click = click.bind(opts))
    el.addEventListener('input', opts.input = debounce(input.bind(opts), 250))
    el.addEventListener('keydown', opts.keydown = keydown.bind(opts))

    return opts
}

export function cleanup(opts: Opts) {
    let el = opts.el
    //el.removeEventListener('focusin', opts.focusin)
    el.removeEventListener('focusout', opts.focusout)
    el.removeEventListener('click', opts.click)
    el.removeEventListener('input', opts.input)
    el.removeEventListener('keydown', opts.keydown)
    opts.unwatch()
}

/*function focusin(e) {
    e.preventDefault()
    e.stopPropagation()

    previous = current
    current = this

    //if (previous !== current)
    //    hidePopup(getInstance(), true)
}*/

/*function hideSuggestNT() {
    let suggest = getInstance()
    if (this === suggest.opts && hideSuggest(suggest, true)) {
        // hidden
    }
}*/

function focusout(this: Opts, e) {
    let self = this,
        name = self.pending_name,
        text = self.el.value
    
    if (name) {
        if (!self.update && text !== name) {
            removeClass(self.el.parentElement, 'suggested')
        } else if (name === self.pojo_[self.fk]) {
            self.el.value = name // redundant on non update
            addClass(self.el.parentElement, 'suggested')
        } else if ((self.flags & Flags.CBFN_AFTER_SET) && self.cbfn) {
            self.pojo_[self.fk] = name
            self.pojo[self.field] = self.pending_value
            self.cbfn(self.field, self.pending_value, self.selected)
        } else if (!self.cbfn || self.cbfn(self.field, self.pending_value, self.selected)) {
            self.pojo_[self.fk] = name
            self.pojo[self.field] = self.pending_value
        }
        self.pending_name = null
        hidePopup(getPopup())
    } else if (text === (name = self.pojo_[self.fk])) {
        text && self.pojo[self.field] && addClass(self.el.parentElement, 'suggested') // redundant
    } else if (self.update) {
        self.el.value = name
        addClass(self.el.parentElement, 'suggested')
    } else if (text) {
        removeClass(self.el.parentElement, 'suggested')
        self.pojo[self.field] = null
    } else if (name) {
        // unset
        self.pojo_[self.fk] = null
        self.pojo[self.field] = null
        0 !== (self.flags & Flags.CBFN_ON_UNSET) && self.cbfn(self.field, null, null)
    }

    //if (self === suggest.opts)
    //    window.setTimeout(self.hideSuggestNT, 100)
}

function click(this: Opts, e) {
    let self = this,
        suggest = getInstance(),
        text: string,
        popup

    e.preventDefault()
    e.stopPropagation()

    if (self === suggest.opts && hidePopup(popup = getPopup()))
        return
    
    text = self.el.value
    
    if (text && text === self.str && self.cache.length) {
        showSuggest(suggest, self, popup)
    }
}

function cbFetchSuccess(this: Opts, data) {
    let self = this,
        value = self.str_fetch
    
    self.disabled = false
    
    if (value !== self.el.value) {
        nextTick(self.input)
        return true
    }

    let array = data['1'],
        suggest = getInstance()
    
    suggest.opts = self
    self.str = value
    if (!array || !array.length) {
        self.cache = emptyArray
        hidePopup(getPopup())
    } else {
        self.cache = array.reverse()
        showSuggest(suggest, self)
        nextTick(self.focusNT)
    }

    return true
}

function cbFetchFailed(this: Opts, err) {
    this.disabled = false
    
    if (this.str_fetch !== this.el.value)
        nextTick(this.input)
}

function input(this: Opts, e) {
    let self = this,
        el = self.el,
        value: string = el.value.trim()
    
    if (self.disabled) {
        // ignore
    } else if (value.length !== el.value.length) {
        // the new input has whitespace, replace with trimmed string
        el.value = value
    } else if (!value) {
        hidePopup(getPopup())
    } else if (value === self.str) {
        // simply re-typed the single letter char
        showSuggest(getInstance(), self)
    } else {
        self.str_fetch = value
        self.disabled = true
        // TODO do not hardcode page size
        self.fetch(acr.$ps_new(value, prk.$new(false, 11)), self)
            .then(self.cbFetchSuccess).then(undefined, self.cbFetchFailed)
    }
}

function keydown(this: Opts, e) {
    let self = this,
        suggest,
        pager
    switch (e.which) {
        //case Keys.BACKSPACE:
        //    return self._input(e)
        case Keys.ENTER:
            // do not propagate the enter key event
            e.preventDefault()
            suggest = getInstance()
            if (self !== suggest.opts && self.cache.length) {
                // show your results.
                showSuggest(suggest, self)
            } else if (toggleSuggest(suggest, self) || self.el.value !== self.pending_name) {
                // noop
            } else if ((self.flags & Flags.CBFN_AFTER_SET)) {
                self.pojo_[self.fk] = self.pending_name
                self.pojo[self.field] = self.pending_value
                self.pending_name = null
                self.cbfn(self.field, self.pending_value, self.selected)
            } else if (!self.cbfn || self.cbfn(self.field, self.pending_value, self.selected)) {
                self.pojo_[self.fk] = self.pending_name
                self.pojo[self.field] = self.pending_value
                self.pending_name = null
            } else {
                self.pending_name = null
            }
            
            /*if (self.el.value) {
                togglePopup(getInstance(), self)
            } else if (!self.update && self.pojo[self.field]) {
                // reset suggest
            }*/
            break
        case Keys.ESCAPE:
            /*if (!util.hidePopup(true) && self.from_editable) {
                getOwner(self).vmessage['f'+self.field_key] = false
            }*/
            //self.pending_name = null
            if (!hidePopup(getPopup()))
                return true
            break
        case Keys.LEFT:
            if (!visiblePopup(getPopup())) return true

            suggest = getInstance()
            pager = suggest.pager
            if (e.ctrlKey) pageFirst(e, pager, self)
            else pagePrevOrLoad(e, pager, self.flags)
            break
        case Keys.UP:
            if (!visiblePopup(getPopup())) break

            suggest = getInstance()
            pager = suggest.pager
            if (e.ctrlKey) moveTopOrUp(e, pager, self)
            else listUp(pager, pager.index_selected, e, self.flags) // TODO pass flags?
            break
        case Keys.RIGHT:
            if (!visiblePopup(getPopup())) return true

            suggest = getInstance()
            pager = suggest.pager
            if (e.ctrlKey) pageLast(e, pager, self)
            else pageNextOrLoad(e, pager, self.flags)
            break
        case Keys.DOWN: // down
            if (!visiblePopup(getPopup())) break

            suggest = getInstance()
            pager = suggest.pager
            if (e.ctrlKey) moveBottomOrDown(e, pager, self)
            else listDown(pager, pager.index_selected, e, self.flags) // TODO pass flags?
            break
        default:
            //if (e.which >= 65 && e.which <= 90)
            //    return self._input(e)
            return true
    }
    
    e.stopPropagation()
    return false
}
