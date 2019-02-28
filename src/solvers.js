/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];    
  for (var row = 0; row < n; row++) {
    var newRow = [];
    for (var col = 0; col < n; col++) {
      if (row === col) {
        newRow.push(1);
      }
      newRow.push(0);
    }
    solution.push(newRow);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme



  // //16 - 9 - 4 - 1
  // //n^2 (n-1)^2 (n-2)^2 ... 1
  // var nArr = [...Array(n).keys()]; //arr of 1 to n
  // var boardList = []; //supposed to keep unique board matrices
  // var coords = [];
  // var board = new Board({n:n});

  // var rookRecurse = function(iArr, jArr, coord) {
  //   //if 2 here
  //   if (iArr.length === 2) {
  //     coord.push([iArr[0], jArr[0]]);
  //     rookRecurse([iArr[1]], [jArr[1]], coord);
  //     coord.pop();
  //     coord.push([iArr[0], jArr[1]]);
  //     rookRecurse([iArr[1]], [jArr[0]], coord);
  //     coord.pop();
  //     return;
  //   }

  //   if (iArr.length === 1) {
  //     coord.push([iArr[0], jArr[0]]);
  //     //console.log('final coordinates: ', JSON.stringify(coord))
  //     var boardArr = []; // array of arrays for Board()
  //     for (var k = 0; k < n; k++) { // iterating through each coordinate in coord
  //       var newArray = [];
  //       newArray.length = n;
  //       newArray.fill(0, 0, n);
  //       newArray[coord[k][1]] = 1;
  //       boardArr[coord[k][0]] = newArray;
  //     }
  //     var inList = false;
  //     for (var b = 0; b < boardList.length; b++) {
  //       if (JSON.stringify(boardList[b]) === JSON.stringify(boardArr)) {
  //         inList = true;
  //       }
  //     }
  //     if (!inList) {
  //       board.set(boardArr);
  //       if (!board.hasAnyRooksConflicts()) {
  //         solutionCount++;
  //         boardList.push(boardArr);
  //       }
  //     }
  //     coord.pop()
  //     return;
  //   }

  //   for (var i = 0; i < iArr.length; i++) { //[0,1]
  //     for (var j = 0; j < jArr.length; j++) { //[0,1]
  //       //record i,j
  //       coord.push([iArr[i], jArr[j]]); //[0,0]
  //       //new iArr doesn't have 0
  //       //new jArr doesn't have 0
  //       var iInd = iArr.indexOf(iArr[i]);
  //       var jInd = jArr.indexOf(jArr[j]);
        

  //       var newIArr = [...iArr];
  //       newIArr.splice(iInd, 1);
  //       var newJArr = [...jArr];
  //       newJArr.splice(jInd, 1);

  //       //if 2 here

  //       rookRecurse(newIArr, newJArr, coord);
  //       coord.pop();


  //       //take nArr and create two new arrays, one without i, one without j
  //       //recurse with these two new arrays as limits
  //       //after full recursion, matrix generated
  //       //input matrix as board, test for collisions
  //       //update counter
  //       //repeat loop
  //     }
  //   }
  // }

  // rookRecurse(nArr, nArr, coords);
  // WHO FUCKING NEEDS THIS ABOVE STUFF
  var rookRecurse = function(n) {
    if (n === 1) { // 1 base case
      return 1;
    }
    if (n === 2) { // 2 base case
      return 2;
    }
    return n * rookRecurse(n-1); // factorial
  }
  solutionCount = rookRecurse(n)
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];

  
  // create empty board
  var board = new Board({n:n});
  //extra hueristics: when recursing into next row, the 3 indices below your marked index
  //(bottom left, bottom, bottom right) can be ignored
  //Corners are FINEEE
  //dead start = -2
  var queenRecurse = function(level, dead) {
    // when we've finished last row, push all board.gets to solution arr
    if (level === n) {
      solution = board.rows();
      return;
    }
    for (var i = 0; i < n; i++) {
      if (!((i >= (dead - 1) && i <= (dead + 1)) )) {
        board.togglePiece(level, i);
        if (!board.hasAnyQueenConflictsOn(level, i)) {
          queenRecurse(level + 1, i)
        }
        if (solution.length > 0) { //only for this function
          return; //if solution exists, return
        }
        board.togglePiece(level, i);
      }
    } 
  }
  
  // set up recursive function to traverse down rows
    //if out of bounds, you did it (base case)
      //here, we board.get all rows to reconstruct a full matrix
      //later, we keep going and increment counter
      //return
    // iterate through each column index to test if it hasAnyConflicts(rook/diagonal)  
      //syntax is board.set(row number, row array)
      // if true, continue with iteration
        //if iterated to end, nothing happens
      // if false, execute next recursion
        
  queenRecurse(0, -2);
  if (solution.length === 0) { //only for this function
    solution = board.rows(); //if solution exists, return
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

    // create empty board
    var board = new Board({n:n});
    //extra hueristics: when recursing into next row, the 3 indices below your marked index
    //(bottom left, bottom, bottom right) can be ignored
    //Corners are FINEEE
    //dead start = -2
    var queenRecurse = function(level, dead) {
      // when we've finished last row, push all board.gets to solution arr
      if (level === n) {
        solutionCount++;
        return;
      }
      for (var i = 0; i < n; i++) {
        if (!((i >= (dead - 1) && i <= (dead + 1)) )) {
          board.togglePiece(level, i);
          if (!board.hasAnyQueenConflictsOn(level, i)) {
            queenRecurse(level + 1, i)
          }
          board.togglePiece(level, i);
        }
      } 
    }
    queenRecurse(0, -2);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
