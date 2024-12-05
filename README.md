# Ball Sort Puzzle Solver

#### A simple brute-force solver script for ball sort puzzle games. Prioritises simplicity over optimal solution.

Yes, it's Javascript, yes Python might run a lot faster, no I don' t care. This was just a quick side thing and Javascript is my jam.

1. Define your puzzle structure in `puzzle.js`. Since I played a version of the game using a "country flags" skin, my balls variable were all using country codes as values. Adjust these values and variable names to your liking.
2. Run `node solver.js` in your console
3. Logs will be output in the console as well as in a `log.txt` file. If you don't want logging (the log file can grow to several hundred MBs with more complex puzzles) remember to comment out the line that writes to the file, or just add a `return;` at the top of the `log()` function.
4. Note: the moves history is output in human-friendly 1-indexed format.

### Todos:
Nothing really. Maybe 1 or 2 changes to add some basic logic and intelligence when it comes to comparing available moves against each other, but nothing fancy. The script is not lightning fast (It takes over 400 seconds on a Apple Silcon M1 Max CPU to solve level 297 as defined in `puzzle.js`) but it works.