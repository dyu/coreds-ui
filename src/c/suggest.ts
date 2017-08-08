import { component } from 'vuets'
import { defp, nullp } from 'coreds/lib/util'
import { Pager, ItemSO, SelectionFlags, PojoListState, PagerState } from 'coreds/lib/types'
import { PojoStore } from 'coreds/lib/pstore/'
import * as prk from 'coreds/lib/prk'
import * as acr from '../acr'
import { Flags } from '../_pager'
import { attachOptsTo } from '../_pager'

var instance: Suggest

export interface Opts {
    str: string
    fetch(req: acr.PS)
    onSelect(message: acr.ACResult, flags: SelectionFlags)
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
    pstore: PojoStore<acr.ACResult>
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
            descriptor: acr.$d,
            keyProperty: '2',
            createObservable(so: ItemSO, idx: number) {
                return acr.$new('', '', 0)
            },
            onSelect(selected: acr.ACResult, flags: SelectionFlags): number {
                self.opts.onSelect(selected, flags)
                return 0
            },
            fetch(req: prk.ParamRangeKey, pager: Pager) {
                let opts = self.opts,
                    val = opts.str.toLowerCase(),
                    store: PojoStore<acr.ACResult> = pager['store'],
                    startObj,
                    pgstart

                if (req[prk.$.startKey] && (startObj = store.startObj)) {
                    pgstart = startObj.$d ? startObj.name : startObj['1']
                    pgstart = pgstart.toLowerCase()
                }
                
                opts.fetch(acr.$ps_new(val, req, undefined, pgstart))
                    .then(self.cbFetchSuccess).then(undefined, self.cbFetchFailed)
            }
        }))
        self.pager = pstore.pager
    }

    static mounted(self: Suggest) {
        attachOptsTo(self['$el'], [`${Flags.SUGGEST}`], self.pager, self)
    }
}

function tpl(suggest_controls: string) {
    return /**/`
<div class="suggest">
  <ul class="ui small divided selection hover list">
    <si v-for="pojo in pager.array" :pojo="pojo"></si>
  </ul>
  <div v-show="pager.size > pager.array.length">
    ${suggest_controls}
  </div>
</div>
`/**/
}

const tpl_suggest_conrols = /**/`
<ul class="ui skimped tiny horizontal list">
  <li class="item">
    <div class="ui tiny icon buttons">
      <button class="ui button" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 0 === pager.page"
          @click.prevent="pager.store.repaint((pager.page = 0))">
        <i class="icon angle-double-left"></i>
      </button>
      <button class="ui button" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE})"
          @click.prevent="pager.store.pagePrevOrLoad(0)">
        <b><i class="icon angle-left"></i></b>
      </button>
      <button class="ui button" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE}) || 0 === pager.size"
          @click.prevent="pager.store.pageNextOrLoad(0)">
        <b><i class="icon angle-right"></i></b>
      </button>
      <button class="ui button" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || pager.page_count === pager.page"
          @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
        <i class="icon angle-double-right"></i>
      </button>
      <span v-show="pager.size">&nbsp;&nbsp;
        {{ pager.page_from }}{{ pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ') }}{{ pager.size }}
      </span>
    </div>
  </li>
</ul>
`/**/

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
    template: tpl(tpl_suggest_conrols)
}, Suggest)

export function $customize(tpl_suggest_conrols: string) {
    return component({
        created(this: Suggest) { Suggest.created(this) },
        mounted(this: Suggest) { Suggest.mounted(this) },
        components: {
            si: {
                name: 'si', props: { pojo: { type: Object, required: true } },
                mounted() { defp(this['$el'], 'pager_item', this['pojo']) },
                template: item_tpl
            }
        },
        template: tpl(tpl_suggest_conrols)
    }, Suggest)
}
