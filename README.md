# Ball Sort Puzzle Solver

#### A simple brute-force solver script for ball sort puzzle games. Prioritises simplicity over optimal solution.

Yes, it's JS, yes Python might run a lot faster, no I don' t care. This was just a quick side thing and JS/TS is my jam.

1. Define your puzzle structure in `puzzle.js`. Since I played a version of the game using a "country flags" skin, my balls variable were all using country codes as values. Adjust these values and variable names to your liking.
2. Run `node ./solver.js` in your console
3. If `enableLogging` is `true`, logs will be output in the console as well as in a `log.txt` file. If you don't want logging - logging makes the script run much, much slower (see below) and the log file can grow to several hundred MBs with more complex puzzles - set `enableLogging` to `false` at the top of the script.
4. Note: the moves history is output in human-friendly 1-indexed format.

### How long does it take to solve?
That obviously depends on the size of the puzzle and the power of the computer running it, but also on the amount of logging. The logging to console + file are the real bottlenecks, enabling it can slow down a complex puzzle solve by a factor of 100x. So if you don't care about how it solves it but just want the solution, be sure to set `enableLogging` to `false`. 

### Todos:
Nothing really. Maybe 1 or 2 changes to add some basic logic and intelligence when it comes to comparing available moves against each other, but nothing fancy. The script is not lightning fast (It takes over 3 seconds on an Apple Silcon M1 Max CPU to solve level 297 as defined in `puzzle.js`) but it works.