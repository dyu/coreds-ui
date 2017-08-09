export function $new(value, name, id) {
    return {
        '1': value,
        '2': id,
        '3': name
    };
}
export var $d = {
    $rfbs: 4, $rfdf: ['3'],
    $fdf: ['2', '3'],
    '1': { _: 1, t: 2, m: 2, a: 0, $n: 'Value' },
    '2': { _: 2, t: 10, m: 1, a: 0, $n: 'Id' },
    '3': { _: 3, t: 3, m: 2, a: 0, $n: 'Name' },
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