import { component } from 'vuets';
import { defp, nullp } from 'coreds/lib/util';
import { PojoStore } from 'coreds/lib/pstore/';
import * as prk from 'coreds/lib/prk';
import { attachOptsTo } from '../_pager';
export function $ps_new(value, prk, end, pgstart) {
    return {
        '1': value,
        '2': end,
        '3': pgstart,
        '4': prk
    };
}
function $acr_new(name, value, id) {
    return {
        '1': name,
        '2': value,
        '3': id
    };
}
var $acr_d = {
    $rfbs: 1, $rfdf: ['1'],
    $fdf: ['1', '3'],
    '1': { _: 1, t: 3, m: 2, a: 0, $: 'name', $n: 'Name' },
    '2': { _: 2, t: 2, m: 2, a: 0, $: 'value', $n: 'Value' },
    '3': { _: 3, t: 10, m: 1, a: 0, $: 'id', $n: 'Id' },
    $new: $acr_new
};
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
            descriptor: $acr_d,
            keyProperty: '2',
            createObservable: function (so, idx) {
                return $acr_new('', '', 0);
            },
            onSelect: function (selected, flags) {
                self.opts.onSelect(selected, flags);
                return 0;
            },
            fetch: function (req, pager) {
                var opts = self.opts, val = opts.str.toLowerCase(), store = pager['store'], startObj, pgstart;
                if (req["3" /* startKey */] && (startObj = store.startObj)) {
                    pgstart = startObj.$d ? startObj.name : startObj['1'];
                    pgstart = pgstart.toLowerCase();
                }
                opts.fetch($ps_new(val, req, undefined, pgstart))
                    .then(self.cbFetchSuccess).then(undefined, self.cbFetchFailed);
            }
        }));
        attachOptsTo(self['$el'], ["" + 512 /* SUGGEST */], pstore.pager, self);
        self.pager = pstore.pager;
    };
    return Suggest;
}());
export { Suggest };
var item_tpl = "\n<li :class=\"(pojo._.lstate & " + 2 /* SELECTED */ + ") ? 'item active' : 'item'\"\n    v-show=\"(pojo._.lstate & " + 1 /* INCLUDED */ + ")\" v-text=\"pojo['1']\"></li>\n"; /**/
export default component({
    created: function () { Suggest.created(this); },
    components: {
        si: {
            name: 'si', props: { pojo: { type: Object, required: true } },
            mounted: function () { defp(this['$el'], 'pager_item', this['pojo']); },
            template: item_tpl
        }
    },
    template: /**/ "\n<div class=\"suggest\">\n  <ul class=\"ui small divided selection list\">\n    <si v-for=\"pojo in pager.array\" :pojo=\"pojo\"></si>\n  </ul>\n  <div v-show=\"pager.size > pager.array.length\">\n    <slot></slot>\n  </div>\n</div>\n" /**/
}, Suggest);
//# sourceMappingURL=suggest.js.map