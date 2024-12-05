const balls = {
    pl: "PL",
    eu: "EU",
    bg: "BG",
    tr: "TR",
    cn: "CN",
    su: "SU",
    cg: "CG",
    bn: "BN",
    au: "AU",
    de: "DE",
    lb: "LB",
    sl: "SL"
};

const {pl, eu, bg, tr, cn, su, cg, bn, au, de, lb, sl} = balls;
let puzzle = [];

// level 1
puzzle = [
    [de,de,au,au],
    [de,de,au,au],
    [null,null,null,null]
];

// level 100
puzzle = [
    [cg, de, cg, bg],
    [tr, eu, cn, de],
    [bg, pl, au, su],
    [bn, su, de, sl],
    [bg, sl, tr, eu],
    [eu, pl, cn, cn],
    [cn, cg, bn, au],
    [bn, bn, au, sl],
    [cg, pl, de, au],
    [eu, tr, tr, sl],
    [su, bg, pl, su],
    [null, null, null, null],
    [null, null, null, null]
];

// level 200
// puzzle = [
//     [sl, sl, tr, pl, de],
//     [eu, cn, pl, au, su],
//     [tr, tr, tr, cn, eu],
//     [de, au, eu, sl, su],
//     [su, pl, su, bg, bg],
//     [pl, cn, bg, sl, de],
//     [cn, bg, cn, au, eu,],
//     [su, eu, de, au, de],
//     [au, pl, tr, sl, bg],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];
//
// // level 250
// puzzle = [
//     [tr, au, tr, su, cn],
//     [sl, au, pl, de, pl],
//     [sl, bg, pl, au, eu],
//     [su, de, cn, su, tr],
//     [sl, eu, eu, de, cn],
//     [bg, pl, sl, sl, cn],
//     [eu, de, su, cn, tr],
//     [su, au, au, bg, eu],
//     [bg, bg, pl, tr, de],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];
//
// // level 280
// puzzle = [
//     [tr, cn, bg, su, au],
//     [cn, bg, eu, cn, sl],
//     [au, eu, sl, de, pl],
//     [cn, tr, pl, tr, pl],
//     [de, bg, de, bg, sl],
//     [eu, bg, sl, tr, pl],
//     [tr, sl, au, su, au],
//     [su, de, su, su, pl],
//     [eu, eu, au, de, cn],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];
//
// // level 290
// puzzle = [
//     [pl, bg, eu, au, eu],
//     [cn, cn, bg, tr, cn],
//     [bg, sl, tr, eu, lb],
//     [lb, au, su, tr, au],
//     [de, de, su, de, cn],
//     [pl, cg, cg, sl, pl],
//     [au, cg, su, sl, bg],
//     [cn, bn, tr, bn, su],
//     [sl, cg, bn, tr, sl],
//     [su, pl, eu, pl, lb],
//     [eu, de, lb, bn, au],
//     [bg, cg, de, lb, bn],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];

// level 295
// puzzle = [
//     [cn, lb, tr, au, de],
//     [de, au, eu, eu, pl],
//     [bg, de, tr, pl, cn],
//     [cg, sl, tr, su, pl],
//     [cg, au, cg, bg, cn],
//     [sl, cn, su, eu, su],
//     [sl, bg, sl, bn, pl],
//     [lb, au, au, cg, lb],
//     [lb, bg, eu, tr, cg],
//     [bn, su, cn, tr, de],
//     [su, lb, eu, bn, bn],
//     [de, bg, sl, bn, pl],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];

// level 296
// puzzle = [
//     [cg, eu, su, au, de],
//     [cn, tr, au, cn, sl],
//     [pl, eu, cg, sl, cn],
//     [de, au, su, cn, su],
//     [de, eu, bg, au, tr],
//     [sl, tr, bg, bg, tr],
//     [cg, cg, cg, cn, de],
//     [sl, eu, su, de, tr],
//     [pl, bg, pl, su, sl],
//     [pl, bg, eu, pl, au],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];
//
// // level 297
// puzzle = [
//     [pl, pl, eu, bg, tr],
//     [cn, su, cg, tr, bn],
//     [bg, au, eu, de, bn],
//     [lb, sl, cg, bg, bg],
//     [de, sl, au, su, bn],
//     [tr, eu, sl, cn, lb],
//     [pl, bn, cg, sl, cg],
//     [su, sl, bn, cn, eu],
//     [lb, lb, au, au, su],
//     [tr, de, cg, eu, cn],
//     [de, bg, de, au, pl],
//     [su, tr, pl, lb, cn],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];
//
// // level 298
// puzzle = [
//     [sl,eu,su,au,su],
//     [pl,pl,cn,pl,au],
//     [tr,tr,de,bn,eu],
//     [de,cn,eu,au,au],
//     [tr,eu,sl,cg,bn],
//     [sl,su,cg,bg,lb],
//     [cg,de,pl,cn,tr],
//     [lb,cn,bg,bn,eu],
//     [bg,cn,tr,bg,au],
//     [sl,lb,bn,cg,lb],
//     [su,su,de,bn,pl],
//     [de,bg,cg,lb,sl],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
// ];

export default puzzle;