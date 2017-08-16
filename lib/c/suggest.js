import { component } from 'vuets';
import { defp, nullp } from 'coreds/lib/util';
import { PojoStore } from 'coreds/lib/pstore/';
import * as prk from 'coreds/lib/prk';
import * as acr from '../acr';
import { attachOptsTo } from '../_pager';
var instance;
export function getInstance() {
    return instance;
}
function cbFetchSuccess(data) {
    this.pstore.cbFetchSuccess(data['1']);
    return true;
}
function cbFetchFailed(err) {
    this.pstore.cbFetchFailed(err);
}
var Suggest = (function () {
    function Suggest() {
        nullp(this, 'pager');
        defp(this, 'opts', null);
    }
    Suggest.created = function (self) {
        instance = self;
        self.cbFetchSuccess = cbFetchSuccess.bind(self);
        self.cbFetchFailed = cbFetchFailed.bind(self);
        var pstore = defp(self, 'pstore', new PojoStore([], {
            desc: false,
            pageSize: 10,
            descriptor: acr.$d,
            keyProperty: '2',
            createObservable: function (so, idx) {
                return { '3': '' };
            },
            onSelect: function (selected, flags) {
                self.opts.onSelect(self.pstore.getOriginal(selected), flags);
                return 0;
            },
            fetch: function (req, pager) {
                var opts = self.opts, val = opts.str.toLowerCase(), store = pager['store'], startObj, pgstart;
                if (req["3" /* startKey */] && (startObj = store.startObj)) {
                    pgstart = startObj.$d ? startObj.name : startObj['1'];
                    pgstart = pgstart.toLowerCase();
                }
                opts.fetch(acr.$ps_new(val, req, undefined, pgstart))
                    .then(self.cbFetchSuccess).then(undefined, self.cbFetchFailed);
            }
        }));
        self.pager = pstore.pager;
    };
    Suggest.mounted = function (self) {
        attachOptsTo(self['$el'], ["" + 512 /* SUGGEST */], self.pager, self);
    };
    return Suggest;
}());
export { Suggest };
function tpl(suggest_controls) {
    return "\n<div class=\"suggest\">\n  <ul class=\"ui small divided selection hover list\">\n    <si v-for=\"pojo in pager.array\" :pojo=\"pojo\"></si>\n  </ul>\n  <div v-show=\"pager.size > pager.array.length\">\n    " + suggest_controls + "\n  </div>\n</div>\n"; /**/
}
var tpl_suggest_conrols = "\n<ul class=\"ui horizontal list\">\n  <li class=\"item\">\n    <button class=\"stripped\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.page\"\n        @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n      <i class=\"icon angle-double-left\"></i>\n    </button>\n  </li>\n  <li class=\"item\">\n    <button class=\"stripped\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ")\"\n        @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n      <b><i class=\"icon angle-left\"></i></b>\n    </button>\n  </li>\n  <li class=\"item\">\n    <button class=\"stripped\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ") || 0 === pager.size\"\n        @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n      <b><i class=\"icon angle-right\"></i></b>\n    </button>\n  <li class=\"item\">\n    <button class=\"stripped\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.size || pager.page_count === pager.page\"\n        @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n      <i class=\"icon angle-double-right\"></i>\n    </button>\n  <li class=\"item\" v-show=\"pager.size\">\n    {{ pager.page_from }}{{ pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ') }}{{ pager.size }}\n  </li>\n</ul>\n"; /**/
var item_tpl = "\n<li :class=\"(pojo._.lstate & " + 2 /* SELECTED */ + ") ? 'item active' : 'item'\"\n    v-show=\"(pojo._.lstate & " + 1 /* INCLUDED */ + ")\" v-text=\"pojo['3']\"></li>\n"; /**/
export default component({
    created: function () { Suggest.created(this); },
    mounted: function () { Suggest.mounted(this); },
    components: {
        si: {
            name: 'si', props: { pojo: { type: Object, required: true } },
            mounted: function () { defp(this['$el'], 'pager_item', this['pojo']); },
            template: item_tpl
        }
    },
    template: tpl(tpl_suggest_conrols)
}, Suggest);
export function $customize(tpl_suggest_conrols) {
    return component({
        created: function () { Suggest.created(this); },
        mounted: function () { Suggest.mounted(this); },
        components: {
            si: {
                name: 'si', props: { pojo: { type: Object, required: true } },
                mounted: function () { defp(this['$el'], 'pager_item', this['pojo']); },
                template: item_tpl
            }
        },
        template: tpl(tpl_suggest_conrols)
    }, Suggest);
}
//# sourceMappingURL=suggest.js.map