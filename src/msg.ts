import { PojoState, HasState } from 'coreds/lib/types'
import { extractMsg } from 'coreds/lib/util'

export interface Wrapper {
    _: HasState
}

export function $new(): HasState {
    return { state: 0, msg: '' }
}

export function attachTo(obj: any, field?: string): Wrapper {
    let hs = $new()
    obj._ = hs
    if (field) {
        obj[field] = null
        hs[field] = null
    }
    return obj
}

export function $warning(hs: HasState, msg: string) {
    hs.state = PojoState.WARNING
    hs.msg = msg
}

export function $error(hs: HasState, msg: string) {
    hs.state = PojoState.ERROR
    hs.msg = msg
}

export function $failed(hs: HasState, err: any) {
    return $error(hs, extractMsg(err))
}

export function $success(hs: HasState, msg?: string) {
    if (msg) {
        hs.state = PojoState.SUCCESS
        hs.msg = msg
    } else {
        hs.state = 0
    }
}

export function $prepare(hs: HasState) {
    if ((hs.state & PojoState.LOADING)) return false
    if (hs.msg) hs.msg = ''
    hs.state = PojoState.LOADING
    return true
}

export function ui(hs: string): string {
    return /**/`
<div :class="'ui msg status-' + (${hs}.state & ${PojoState.MASK_STATUS})" v-show="${hs}.msg">
  <i class="icon close" @click.prevent="${hs}.msg = null"></i>
  <span v-text="${hs}.msg"></span>
</div>
`/**/
}