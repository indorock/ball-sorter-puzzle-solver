import fs from 'fs';
import path from 'path';


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

// level 100
let tubesInitial = [
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
tubesInitial = [
    [sl, sl, tr, pl, de],
    [eu, cn, pl, au, su],
    [tr, tr, tr, cn, eu],
    [de, au, eu, sl, su],
    [su, pl, su, bg, bg],
    [pl, cn, bg, sl, de],
    [cn, bg, cn, au, eu,],
    [su, eu, de, au, de],
    [au, pl, tr, sl, bg],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 250
tubesInitial = [
    [tr, au, tr, su, cn],
    [sl, au, pl, de, pl],
    [sl, bg, pl, au, eu],
    [su, de, cn, su, tr],
    [sl, eu, eu, de, cn],
    [bg, pl, sl, sl, cn],
    [eu, de, su, cn, tr],
    [su, au, au, bg, eu],
    [bg, bg, pl, tr, de],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 280
tubesInitial = [
    [tr, cn, bg, su, au],
    [cn, bg, eu, cn, sl],
    [au, eu, sl, de, pl],
    [cn, tr, pl, tr, pl],
    [de, bg, de, bg, sl],
    [eu, bg, sl, tr, pl],
    [tr, sl, au, su, au],
    [su, de, su, su, pl],
    [eu, eu, au, de, cn],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 290
tubesInitial = [
    [pl, bg, eu, au, eu],
    [cn, cn, bg, tr, cn],
    [bg, sl, tr, eu, lb],
    [lb, au, su, tr, au],
    [de, de, su, de, cn],
    [pl, cg, cg, sl, pl],
    [au, cg, su, sl, bg],
    [cn, bn, tr, bn, su],
    [sl, cg, bn, tr, sl],
    [su, pl, eu, pl, lb],
    [eu, de, lb, bn, au],
    [bg, cg, de, lb, bn],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 295
// tubesInitial = [
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
tubesInitial = [
    [cg, eu, su, au, de],
    [cn, tr, au, cn, sl],
    [pl, eu, cg, sl, cn],
    [de, au, su, cn, su],
    [de, eu, bg, au, tr],
    [sl, tr, bg, bg, tr],
    [cg, cg, cg, cn, de],
    [sl, eu, su, de, tr],
    [pl, bg, pl, su, sl],
    [pl, bg, eu, pl, au],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 297
tubesInitial = [
    [pl, pl, eu, bg, tr],
    [cn, su, cg, tr, bn],
    [bg, au, eu, de, bn],
    [lb, sl, cg, bg, bg],
    [de, sl, au, su, bn],
    [tr, eu, sl, cn, lb],
    [pl, bn, cg, sl, cg],
    [su, sl, bn, cn, eu],
    [lb, lb, au, au, su],
    [tr, de, cg, eu, cn],
    [de, bg, de, au, pl],
    [su, tr, pl, lb, cn],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

// level 298
tubesInitial = [
    [sl,eu,su,au,su],
    [pl,pl,cn,pl,au],
    [tr,tr,de,bn,eu],
    [de,cn,eu,au,au],
    [tr,eu,sl,cg,bn],
    [sl,su,cg,bg,lb],
    [cg,de,pl,cn,tr],
    [lb,cn,bg,bn,eu],
    [bg,cn,tr,bg,au],
    [sl,lb,bn,cg,lb],
    [su,su,de,bn,pl],
    [de,bg,cg,lb,sl],
    [null, null, null, null, null],
    [null, null, null, null, null]
];

const counts = {};
const tubeSize = 5;
let startTime = Date.now();
const filePath = path.join('./log.txt');
fs.writeFileSync(filePath, "*********************************** START TME"  + Date.now() + "**************************************\n\n");

const log = (args) => {
    if(typeof args === 'string'){
        args = [args];
    }

    console.log(args);
    for(let i=0; i<args.length; i++){
        const msg = args[i];
        fs.appendFileSync(filePath, (typeof msg === 'string' ? msg: JSON.stringify(msg)));
        fs.appendFileSync(filePath, "\n");
    }
    fs.appendFileSync(filePath, "\n-------------------------------------------------------------------\n");
};

const checkProblem = () => {
    let ret = true;

    for (let i = 0; i < tubesInitial.length; i++) {
        const tube = tubesInitial[i];
        for (let j = 0; j < tube.length; j++) {
            const ball = tube[j];
            if (ball !== null) {
                if (!counts[ball]) {
                    counts[ball] = 0;
                }
                counts[ball]++;
            }
        }
    }
    for (const i in counts) {
        if (counts[i] !== tubeSize) {
            log('wrong amount of ' + counts[i] + ' balls:' + i);
            ret = false;
        } else {
            // log("count OK for " + i);
        }
    }
    return ret;
};

const solve = (tubes, moveHistory, depth) => {
    if (depth > 100) {
        return;
    }
    const ballGroups = [];
    const slots = [];
    const solvedTubes = [];

    tubes = JSON.parse(JSON.stringify(tubes));
    const availableMoves = [];
    let emptyTubes = 0;

    for (let i = 0; i < tubes.length; i++) {
        ballGroups[i] = null;
        slots[i] = null;
        // log(["CHECK TUBE", i, tubes[i]]);

        // if(solvedTubes.includes(i)){
        //     continue;
        // }
        const balls = tubes[i];

        let topBall = null;
        let count = 0;
        let emptySlots = 0;
        for (let j = 0; j < balls.length; j++) {
            // log(["BALL", j, balls[j]]);
            if (balls[j] !== null) {
                if (topBall === null) {
                    topBall = balls[j];
                    // log(["TOP BALL", topBall]);
                } else if (balls[j] !== topBall) {
                    break;
                }
                count++;
            } else {
                // log("EMPTY!!!!");
                emptySlots++;
            }
        }
        if(count === 0){
            emptyTubes++;
        }
        if (count === tubeSize) {
            // this tube is solved!
            log(["REMOVE TUBE", i, balls]);
            log(['EMPTY TUBES', emptyTubes]);
            solvedTubes.push(i);
        } else if (count) {
            ballGroups[i] = {color: topBall, count};
        }
        // log(["SOLVED TUBES", solvedTubes]);

        if (solvedTubes.length === tubes.length - emptyTubes) {
            log(['EMPTY TUBES!!', emptyTubes]);
            log("************************************************************************************************************************");
            log("************************************************************************************************************************");
            log("************************************************************************************************************************");
            log("************************************ PUZZLE SOLVED  IN " + moveHistory.length + " MOVES!!!!!!!!!!!!!!!!! ***************************************");
            log("********************************************* TIME ELAPSED: " + (Date.now() - startTime) + " MS ************************************************");
            log("************************************************************************************************************************");
            log("************************************************************************************************************************");
            log("************************************************************************************************************************");
            log(moveHistory);
            log(tubes);
            return true;
        }
// log(["EMPTY SLOTS", emptySlots]);
        if (emptySlots.length === tubeSize) {
            slots[i] = {color: null, count: tubeSize, empty: true};
        } else if (emptySlots) {
            slots[i] = {color: topBall, count: emptySlots};
        } else {
            slots[i] = {count: 0};
        }
    }

    // log(["BALL GROUPS", ballGroups]);
    // log(["SLOTS", slots]);
    let hasEmptyTube = false;
    for (let j = 0; j < slots.length; j++) {
        const slot = slots[j];
        if (!slot || slot.count === 0) {
            continue;
        }
        for (let k = 0; k < ballGroups.length; k++) {
            if (k === j) {
                continue;
            }
            const group = ballGroups[k];
            if (group && (((!slot.color && !hasEmptyTube) || group.color === slot.color) && slot.count >= group.count && !(group.count + slots[k].count === tubeSize && slot.count === tubeSize))) {

                if (moveHistory.length) {
                    const lastMove = moveHistory[moveHistory.length - 1];
                    if (lastMove.to - 1 === k && lastMove.from - 1 === j) {
                        continue;
                    }
                }
                availableMoves.push({from: k, to: j});
            }
        }
        if (!slot.color) {
            hasEmptyTube = true;
        }
    }
    log(["AVAILABLE MOVES", availableMoves]);
    log(["DEPTH", depth]);

    if (!availableMoves.length) {
        log(['********************************************************* NO MOVES LEFT!!! **********************************************************', moveHistory]);
        const lastMove = moveHistory[moveHistory.length - 1];
        if (lastMove.from === 10 && lastMove.to === 3) {
            // throw new Error('!!!!!!!!!!!!!!!!!!!!!');
        }
        return false;
    }

    for (let l = 0; l < availableMoves.length; l++) {
        const move = availableMoves[l];
        // log(["MOVE", move]);
        log(["TUBES BEFORE MOVE", tubes]);
        const tubesState = JSON.parse(JSON.stringify(tubes));
        doMove(move, tubesState, ballGroups, slots);
        // const ballgroupsState = JSON.parse(JSON.stringify(ballGroups));
        // const slotsState = JSON.parse(JSON.stringify(slots));
        log(["TUBES AFTER MOVE", tubesState]);
        log(["HISTORY", [...moveHistory, {from: move.from + 1, to: move.to + 1}]]);
        const ret = solve(tubesState, [...moveHistory, {from: move.from + 1, to: move.to + 1}], depth + 1);
        if (ret === true) {
            return true;
        } else if (ret === false) {

        }
    }
    return tubes;
};

const doMove = (move, tubes, ballGroups, slots) => {
    const group = ballGroups[move.from];
    const sourceSlot = slots[move.from];
    const targetSlot = slots[move.to];
    // log(["SOURCE", sourceSlot]);
    const sourceStart = sourceSlot.count + group.count - 1;
    const sourceEnd = sourceStart - group.count;
    let targetIndex = targetSlot.count - 1;
    // log(["TARGET", targetSlot, targetIndex]);
    log(["DO MOVE", {from:move.from+1, to:move.to+1}]);
    for (let i = sourceStart; i > sourceEnd; i--) {
        tubes[move.from][i] = null;
        tubes[move.to][targetIndex] = group.color;
        targetIndex--;
        // log(["MOVE BALL", tubes]);
    }
};

const ok = checkProblem();
if (ok) {
    solve(tubesInitial, [], 0);
}
