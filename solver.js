import fs from 'fs';
import path from 'path';
import puzzle from './puzzle.js';

// set to true to enable logging of every single attempted move to console and file. WARNING: this **massively** slows down execution of the script by about 100x
const enableLogging = false;

let startTime = Date.now();
const filePath = path.join('./log.txt');
fs.writeFileSync(filePath, "*********************************** START TME" + Date.now() + "**************************************\n\n");

const counts = {};
const tubeSize = puzzle[0].length;

const log = (args, logfileOnly = false) => {
    if(!enableLogging){
        return false;
    }

    if (typeof args === 'string') {
        args = [args];
    }
    if(!logfileOnly) {
        console.log(...args);
    }

    for (let i = 0; i < args.length; i++) {
        const msg = args[i];
        fs.appendFileSync(filePath, (typeof msg === 'string' ? msg : JSON.stringify(msg)));
        fs.appendFileSync(filePath, "\r\n");
    }
    fs.appendFileSync(filePath, "\n-------------------------------------------------------------------\n");
};

const checkProblem = (puzzle) => {
    let ret = true;
    let tubeLength = puzzle[0].length;

    for (let i = 0; i < puzzle.length; i++) {
        const tube = puzzle[i];
        if (tube.length !== tubeLength) {
            log([`TUBE ${i + 1} HAS WRONG NUMBER OF SLOTS`, tube]);
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
            log('WRONG NUMBER OF ' + counts[i] + ' BALLS:' + i);
            ret = false;
        }
    }
    return ret;
};

const solve = (puzzle, moveHistory, depth) => {
    // depth is max number of moves that we want to try, so far the most complex puzzles I've thrown at it took about 56 moves to solve and almost 10 minutes.
    // This check might seem overkill (and getting to 100 moves would probably take hours if not days to get that far), but it's there just in case.
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
        if (count === 0) {
            emptyTubes++;
            // log(['EMPTY TUBES', emptyTubes]);
        }
        if (count === tubeSize) {
            // this tube is solved!
            // log(["SOLVED TUBE", i, balls]);
            solvedTubes.push(i);
        } else if (count) {
            ballGroups[i] = {color: topBall, count};
        }
        // log(["SOLVED TUBES", solvedTubes]);

        if (solvedTubes.length === tubes.length - emptyTubes) {
            log([tubes]);
            const sucessMessage = [
                "*******************************************************************************************************************",
                "****************************************** PUZZLE SOLVED  IN " + moveHistory.length + " MOVES! ********************************************",
                "****************************************** TIME ELAPSED: " + (Date.now() - startTime) / 1000 + " seconds *****************************************",
                "*******************************************************************************************************************",
            ];
            log([sucessMessage], true);
            log([moveHistory], true);
            console.log(sucessMessage);
            console.log([moveHistory]);
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
                // TODO: add a `weight` key to the move object, that gives priority to "better" moves, but first need to determine the logic of what makes a better move.
                availableMoves.push({from: k, to: j});
            }
        }
        if (!slot.color) {
            hasEmptyTube = true;
        }
    }
    log(["AVAILABLE MOVES", availableMoves]);

    if (!availableMoves.length) {
        log(['********************************************************* NO MOVES LEFT!!! **********************************************************', moveHistory]);
        return false;
    }

    for (let l = 0; l < availableMoves.length; l++) {
        const move = availableMoves[l];
        // log(["TUBES BEFORE MOVE", tubes]);
        const tubesState = JSON.parse(JSON.stringify(tubes));
        doMove(move, tubesState, ballGroups, slots);
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
