# Go-moku in React: a react tutorial gets out of control.

run it: https://webpropopuli.github.io/gomoku-react/

This has it's roots in Dan Abramov's ridiculously awesome Tic-tac-toe demo (https://reactjs.org/tutorial/tutorial.html)

Not because tic-tac-toe is fascinating but because Dan explaining React is. If you want to get a grip on React - from one of the Gods of React - I recommend this one because it's

1.  awesome, and
2.  it's not a To-do app

Dan showed us how to build the app and taught about props, state, "lifting" state and about twenty other things you should know. If you are brand new to React I seriously recommend taking half a day and going through it. Then when you need to go full-on MERN stack, you'll just have to come to terms with some Mongo and Express and there are a few good tuts on just those two.

## So if Dan did all the work why are we here?

For one, I really needed to put something cool in my Github, but the main thing here is about scaling something _simple_ into something _useful_ - I'm pretty sure nobody over the age of 7 is playing tic-tac-toe for fun any more. (Except possibly these guys: https://www.arktimes.com/ArkansasBlog/archives/2012/06/11/arkansass-claim-to-fame-tick-tack-toe-playing-chickens)

## The result... Gomoku!

Gomoku is to tic-tac-toe what Chess is to Checkers, or what Go is to Chess. If that's unclear, it's more like what Aerosmith is to that band you had in high-school.

### The main challenges scaling from Tic-tac-toe(TTT) to Gomoku

1. Drawing the board needs refactoring as the fixed 3x3 TTT board is now 19x19 AND it might make sense to play on different sized boards for learning or perhaps game-variants. Hard-coding in JSX three row <divs> with three <Squares> each is basic and still readable, but just moving to a 4x4 board adds another 8 lines of code; 5x5 adds 11 more to that and so on. It gets un-readable and un-manageable fast, and it's not even interesting code that gets added.
   We'll convert this (hard-coded for 3x3):

```
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
```

into this which works for any size grid:

```
    //build the board initially
    const rowSize = 19;

    const rows = [];
    for (let y = 0; y < rowSize; y++) {
      let row = [];
      for (let x = 0; x < rowSize; x++) {
        row.push(this.renderSquare(x + y * rowSize));
      }
      rows.push(row);
    }

    // RENDER() THE BOARD
    return (
      <div>
        {rows.map(r => (
          <div className="board-row">{r}</div>
        ))}
      </div>
    );
  }
}
```

Plus show the code on the

2. The logic to check for won positions will not scale from the TTT logic, so this needs a total re-design. Also, let's not lose the TTT logic.
3. Possibly, the logic around move-history may need a rethink, though possibly not. Still looking at this.

#TBD
#Phases and repo branches
##1. Initial install and code
We started this with a generic create-react-app instance and then deleted everything in the /src directory to start somewhat from scratch. If you notice any remnants of a larger app here, it's probably c-r-a boilerplate. _You_ should just clone my repo
##2. RefactorBoard drawing code
This is really just some JS fiddling but it really cleans up the board drawing code while making it work for any sized board. In a more developed app, I'd probably move the board size const to something like '.gameconfig'
##3. 2do: Winning-game logic.
In the 3x3 TTT board, there are only 8 possible win combinations (vertical, horizontal, diagonal) and they cover an entire edge-to-edge part of the board. Gomoku looks for five-in-a-row anwhere on a 19x19 grid. Listing all the possible wins seems like a nightmare there. (Or just something so tedious that I don't want any part of it.)
