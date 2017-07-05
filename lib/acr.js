export function $new(name, value, id) {
    return {
        '1': name,
        '2': value,
        '3': id
    };
}
export var $d = {
    $rfbs: 1, $rfdf: ['1'],
    $fdf: ['1', '3'],
    '1': { _: 1, t: 3, m: 2, a: 0, $: 'name', $n: 'Name' },
    '2': { _: 2, t: 2, m: 2, a: 0, $: 'value', $n: 'Value' },
    '3': { _: 3, t: 10, m: 1, a: 0, $: 'id', $n: 'Id' },
    $new: $new
};
export function $ps_new(value, prk, end, pgstart) {
    return {
        '1': value,
        '2': end,
        '3': pgstart,
        '4': prk
    };
}
//# sourceMappingURL=acr.js.map