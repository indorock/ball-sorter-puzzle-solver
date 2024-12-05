import fs from 'fs';
import path from 'path';
import puzzle from './puzzle.js';

let startTime = Date.now();
const filePath = path.join('./log.txt');
fs.writeFileSync(filePath, "*********************************** START TME"  + Date.now() + "**************************************\n\n");

const counts = {};
const tubeSize = puzzle[0].length;

const log = (args) => {
    if(typeof args === 'string'){
        args = [args];
    }

    console.log(...args);

    for(let i=0; i<args.length; i++){
        const msg = args[i];
        fs.appendFileSync(filePath, (typeof msg === 'string' ? msg: JSON.stringify(msg)));
        fs.appendFileSync(filePath, "\n");
    }
    fs.appendFileSync(filePath, "\n-------------------------------------------------------------------\n");
};

const checkProblem = (puzzle) => {
    let ret = true;
    let tubeLength = puzzle[0].length;

    for (let i = 0; i < puzzle.length; i++) {
        const tube = puzzle[i];
        if(tube.length !== tubeLength){
            log([`TUBE ${i+1} HAS WRONG NUMBER OF SLOTS`, tube]);
            return false;
        }
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

const solve = (puzzle, moveHistory, depth) => {
    if (depth > 100) {
        return;
    }
    const ballGroups = [];
    const slots = [];
    const solvedTubes = [];

    const tubes = JSON.parse(JSON.stringify(puzzle));
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
            // log(["REMOVE TUBE", i, balls]);
            // log(['EMPTY TUBES', emptyTubes]);
            solvedTubes.push(i);
        } else if (count) {
            ballGroups[i] = {color: topBall, count};
        }
        // log(["SOLVED TUBES", solvedTubes]);

        if (solvedTubes.length === tubes.length - emptyTubes) {
            log(['EMPTY TUBES!!', emptyTubes]);
            log("*******************************************************************************************************************");
            log("*******************************************************************************************************************");
            log("*******************************************************************************************************************");
            log("****************************************** PUZZLE SOLVED  IN " + moveHistory.length + " MOVES! ********************************************");
            log("****************************************** TIME ELAPSED: " + (Date.now() - startTime)/1000 + " seconds *****************************************");
            log("*******************************************************************************************************************");
            log("*******************************************************************************************************************");
            log("*******************************************************************************************************************");
            log([moveHistory]);
            log([tubes]);
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
    // log(["DEPTH", depth]);

    if (!availableMoves.length) {
        log(['********************************************************* NO MOVES LEFT!!! **********************************************************', moveHistory]);
        const lastMove = moveHistory[moveHistory.length - 1];
        // log(["MOVES", moveHistory]);
        // log(["LAST MOVE", lastMove]);
        return false;
    }

    for (let l = 0; l < availableMoves.length; l++) {
        const move = availableMoves[l];
        // log(["TUBES BEFORE MOVE", tubes]);
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
    log(["DO MOVE", move]);
    for (let i = sourceStart; i > sourceEnd; i--) {
        tubes[move.from][i] = null;
        tubes[move.to][targetIndex] = group.color;
        targetIndex--;
        // log(["MOVE BALL", tubes]);
    }
};

const ok = checkProblem(puzzle);
if (ok) {
    solve(puzzle, [], 0);
}