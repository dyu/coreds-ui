import { component } from 'vuets'
import { defp, nullp } from 'coreds/lib/util'
import { Pager, ItemSO, SelectionFlags, PojoListState } from 'coreds/lib/types'
import { PojoStore } from 'coreds/lib/pstore/'
import * as prk from 'coreds/lib/prk'
import { Flags } from '../_pager'
import { attachOptsTo } from '../_pager'

export interface PS {
    /** value = 1, required */
    ['1']: string
    /** end = 2, optional */
    ['2']?: string
    /** pgstart = 3, optional */
    ['3']?: string
    /** prk = 4, required */
    ['4']: prk.ParamRangeKey
}
export function $ps_new(value: string, prk: prk.ParamRangeKey, end?: string, pgstart?: string): PS {
    return {
        '1': value,
        '2': end,
        '3': pgstart,
        '4': prk
    }
}

export interface ACResult {
    /** name = 1, required */
    ['1']: string
    /** value = 2, required */
    ['2']: string
    /** id = 3, optional */
    ['3']?: number
}
function $acr_new(name: string, value: string, id?: number): ACResult {
    return {
        '1': name,
        '2': value,
        '3': id
    }
}
const $acr_d = {
    $rfbs: 1, $rfdf: ['1'],
    $fdf: ['1','3'],
    '1': {_: 1, t: 3, m: 2, a: 0, $: 'name', $n: 'Name'},
    '2': {_: 2, t: 2, m: 2, a: 0, $: 'value', $n: 'Value'},
    '3': {_: 3, t: 10, m: 1, a: 0, $: 'id', $n: 'Id'},
    $new: $acr_new
}

var instance: Suggest

export interface Opts {
    str: string
    fetch(req: PS)
    onSelect(message: ACResult, flags: SelectionFlags)
}

export function getInstance(): Suggest {
    return instance
}

function cbFetchSuccess(this: Suggest, data) {
    this.pstore.cbFetchSuccess(data['1'])
    return true
}

function cbFetchFailed(this: Suggest, err) {
    this.pstore.cbFetchFailed(err)
}

export class Suggest {
    pager: Pager
    pstore: PojoStore<ACResult>
    opts: Opts

    cbFetchSuccess: any
    cbFetchFailed: any
    
    constructor() {
        nullp(this, 'pager')
        defp(this, 'opts', null)
    }
    
    static created(self: Suggest) {
        instance = self

        self.cbFetchSuccess = cbFetchSuccess.bind(self)
        self.cbFetchFailed = cbFetchFailed.bind(self)

        let pstore  = defp(self, 'pstore', new PojoStore([], {
            desc: false,
            pageSize: 10,
            descriptor: $acr_d,
            keyProperty: '2',
            createObservable(so: ItemSO, idx: number) {
                return $acr_new('', '', 0)
            },
            onSelect(selected: ACResult, flags: SelectionFlags): number {
                self.opts.onSelect(selected, flags)
                return 0
            },
            fetch(req: prk.ParamRangeKey, pager: Pager) {
                let opts = self.opts,
                    val = opts.str.toLowerCase(),
                    store: PojoStore<ACResult> = pager['store'],
                    startObj,
                    pgstart

                if (req[prk.$.startKey] && (startObj = store.startObj)) {
                    pgstart = startObj.$d ? startObj.name : startObj['1']
                    pgstart = pgstart.toLowerCase()
                }
                
                opts.fetch($ps_new(val, req, undefined, pgstart))
                    .then(self.cbFetchSuccess).then(undefined, self.cbFetchFailed)
            }
        }))
        self.pager = pstore.pager
    }

    static mounted(self: Suggest) {
        attachOptsTo(self['$el'], [`${Flags.SUGGEST}`], self.pager, self)
    }
}
const item_tpl = /**/`
<li :class="(pojo._.lstate & ${PojoListState.SELECTED}) ? 'item active' : 'item'"
    v-show="(pojo._.lstate & ${PojoListState.INCLUDED})" v-text="pojo['1']"></li>
`/**/
export default component({
    created(this: Suggest) { Suggest.created(this) },
    mounted(this: Suggest) { Suggest.mounted(this) },
    components: {
        si: {
            name: 'si', props: { pojo: { type: Object, required: true } },
            mounted() { defp(this['$el'], 'pager_item', this['pojo']) },
            template: item_tpl
        }
    },
    template: /**/`
<div class="suggest">
  <ul class="ui small divided selection list">
    <si v-for="pojo in pager.array" :pojo="pojo"></si>
  </ul>
  <div v-show="pager.size > pager.array.length">
    <slot></slot>
  </div>
</div>
`/**/
}, Suggest)