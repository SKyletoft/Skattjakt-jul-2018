console.log("1. Why are you looking at this?\n2. Ignore the probable errors, I just repurposed some really old code and don't know how most of it works, just limited it so that it does what I need it to.");

var Mines = new Array;
var Board = new Array;
var visibleBoard = new Array;
var Flags = new Array;
var gameRunning = false;
var gameStarted = false;
var boardHeight = 10;
var boardWidth = 10;
var time = 0;
var mineCount = 10;
var whichMine;

var MineGen = function (height, width, mineCount) {
    var minesGenerated = new Array;
    for (var i = 0; i < mineCount; i++) {
        var thisMineOk = false;
        thisMine = [Math.round(Math.random() * height), Math.round(Math.random() * width)];
        while (!thisMineOk) {
            thisMine = [Math.round(Math.random() * height), Math.round(Math.random() * width)];
            thisMineOk = true;
            if (minesGenerated.length > 0) {
                for (var j = 0; j < minesGenerated.length; j++) {
                    if (thisMine[0] === minesGenerated[j][0]) {
                        if (thisMine[1] === minesGenerated[j][1]) {
                            thisMineOk = false;
                        }
                    }
                }
            }
            if (thisMine[0] === height || thisMine[1] === width) {
                thisMineOk = false;
            }
        }
        minesGenerated[minesGenerated.length] = thisMine;
    }
    return minesGenerated;
};

var NumberGen = function (height, width, minesA) {
    var theBoard = new Array;
    for (var i = 0; i < height; i++) {
        theBoard[i] = new Array;
        for (var j = 0; j < width; j++) {
            theBoard[i][j] = 0;
        }
    }
    for (var m = 0; m < minesA.length; m++) {
        for (var n = -1; n < 2; n++) {
            for (var k = -1; k < 2; k++) {
                if (minesA[m][0] + n >= 0 && minesA[m][0] + n < height) {
                    if (minesA[m][1] + k >= 0 && minesA[m][1] + k < width) {
                        if (n === 0 && k === 0) {
                            theBoard[minesA[m][0] + n][minesA[m][1] + k] = "💣";
                        } else {
                            if (typeof theBoard[minesA[m][0] + n][minesA[m][1] + k] === "number") {
                                theBoard[minesA[m][0] + n][minesA[m][1] + k] += 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return theBoard;
};

var clearBoard = function (height, width, emptyOrClear = false) {
    var theBoard = new Array;
    for (var i = 0; i < height; i++) {
        theBoard[i] = new Array;
        for (var j = 0; j < width; j++) {
            theBoard[i][j] = emptyOrClear;
        }
    }
    return theBoard;
};

var drawBoard = function (height, width, board) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (visibleBoard[i][j] === true) {
                switch (Board[i][j]) {
                    case 0:
                        document.getElementById("H" + i + "W" + j).innerHTML = "";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 1:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='one'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 2:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='two'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 3:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='three'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 4:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='four'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 5:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='five'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 6:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='six'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 7:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='seven'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case 8:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='eight'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case "💣":
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='two'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                    case "⛳":
                        document.getElementById("H" + i + "W" + j).innerHTML = board[i][j];
                        document.getElementById("H" + i + "W" + j).className = "locked";
                        break;
                    default:
                        document.getElementById("H" + i + "W" + j).innerHTML = "<b class='one'>" + board[i][j] + "</b>";
                        document.getElementById("H" + i + "W" + j).className = "open";
                        break;
                }
            }
            var isOnList = false;
            for (var k = 0; k < Flags.length; k++) {
                if (i === Flags[k][0]) {
                    if (j === Flags[k][1]) {
                        isOnList = k;
                    }
                }
            }
            if (typeof isOnList === "number") {
                document.getElementById("H" + i + "W" + j).innerHTML = "⛳";
                document.getElementById("H" + i + "W" + j).className = "locked";
            }
        }
    }
    document.getElementById("mineCount").innerHTML = mineCount;
};

var openAllMines = function () {
    for (var i = 0; i < Mines.length; i++) {
        visibleBoard[Mines[i][0]][Mines[i][1]] = true;
        Flags = new Array;
    }
};

var openSquare = function (X, Y) {
    if (visibleBoard[X][Y] === false) {
        visibleBoard[X][Y] = true;
        if (Board[X][Y] === "💣") {
            gameRunning = false;
            document.getElementById("titleBar").innerHTML = "GAME OVER";
            setTimeout(showEnd, 500, false);
            clearBoard(boardHeight, boardWidth, true);
            openAllMines();
        } else if (Board[X][Y] === 0) {
            //CHAIN!
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    if (!(i === 0 && j === 0)) {
                        if (X + i >= 0 && X + i < boardHeight) {
                            if (Y + j >= 0 && Y + j < boardWidth) {
                                openSquare(X + i, Y + j);
                            }
                        }
                    }
                }
            }
        } else {
            //Number, nothing happens
        }
        drawBoard(boardHeight, boardWidth, Board);
    }
};

var markSquare = function (X, Y) {
    if (visibleBoard[X][Y] === false) {
        visibleBoard[X][Y] = true;
        Flags[Flags.length] = [X, Y];
        mineCount--;
    } else {
        var isOnList = false;
        for (var i = 0; i < Flags.length; i++) {
            if (X === Flags[i][0]) {
                if (Y === Flags[i][1]) {
                    isOnList = i;
                }
            }
        }
        if (typeof isOnList === "number") {
            Flags.splice(isOnList, 1);
            visibleBoard[X][Y] = false;
            document.getElementById("H" + X + "W" + Y).innerHTML = "";
            document.getElementById("H" + X + "W" + Y).className = "";
            mineCount++;
        }
    }
    drawBoard(boardHeight, boardWidth, Board);
};

var checkWin = function () {
    var localFlags = Flags.slice();
    var localBombs = Mines.slice();
    for (var i = 0; i < localFlags.length; i++) {
        for (var j = 0; j < localBombs.length; j++) {
            if (localFlags[i][0] === localBombs[j][0]) {
                if (localFlags[i][1] === localBombs[j][1]) {
                    localFlags.splice(i, 1);
                    localBombs.splice(j, 1);
                    i--;
                    j = localBombs.length;
                }
            }
        }
    }
    if (localFlags.length === 0) {
        if (localBombs.length === 0) {
            return true;
        }
    }
    return false;
};

var timeCounter = function () {
    if (gameRunning) {
        time++;
        document.getElementById("timeDiv").innerHTML = Math.floor(time / 10);
    }
};

setInterval(timeCounter, 100);

var newGame = function (height, width, mines) {
    console.log("Starts new game");
    boardHeight = height;
    boardWidth = width;
    document.getElementById("theTable").innerHTML = tableGenerator(height, width, false);
    gameRunning = false;
    gameStarted = false;
    visibleBoard = clearBoard(height, width, false);
    mineCount = mines;
    Flags = new Array;
    time = 0;
    drawBoard(boardHeight, boardWidth, Board);
    document.getElementById("timeDiv").innerHTML = 0;
    hideEnd();
    if (localStorage.getItem(String(boardHeight + "x" + boardWidth + "+" + Flags.length)) === null) {
        localStorage.setItem(String(boardHeight + "x" + boardWidth + "+" + Flags.length), 99999999);
    }
    $(document).ready(startjQuery());
};

var startGame = function (X, Y) {
    console.log("Starts the game");
    var not = [X, Y];
    Mines = MineGen(boardHeight, boardWidth, mineCount);
    Board = NumberGen(boardHeight, boardWidth, Mines);
    while (Board[not[0]][not[1]] !== 0) {
        Mines = MineGen(boardHeight, boardWidth, mineCount);
        Board = NumberGen(boardHeight, boardWidth, Mines);
    }
    gameRunning = true;
    gameStarted = true;
};

var idToCoords = function (idString = "H1W1") {
    var breakPoint;
    for (var i = 0; i < idString.length; i++) {
        if (idString.substr(i, 1) === "W") {
            breakPoint = i;
        }
    }
    return [Number(idString.substring(1, breakPoint)), Number(idString.substring(breakPoint + 1, idString.length))];
};

var hideEnd = function () {
    document.getElementById("endState").setAttribute('style', 'display:none');
    document.getElementById("timeState").setAttribute('style', 'display:none');
    document.getElementById("boardState").setAttribute('style', 'display:none');
    document.getElementById("recordState").setAttribute('style', 'display:none');
    document.getElementById("theTable").setAttribute('style', 'display:inherit');
    document.getElementById("timeDiv").setAttribute('style', 'display:inherit');
    document.getElementById("mineCount").setAttribute('style', 'display:inherit');
    document.getElementById("titleBar").setAttribute('style', 'display:inherit');
}

var showEnd = function (winOrLose) {
    document.getElementById("endState").setAttribute('style', 'display:inherit');
    document.getElementById("timeState").setAttribute('style', 'display:inherit');
    document.getElementById("boardState").setAttribute('style', 'display:inherit');
    document.getElementById("recordState").setAttribute('style', 'display:inherit');
    document.getElementById("theTable").setAttribute('style', 'display:none');
    document.getElementById("timeDiv").setAttribute('style', 'display:none');
    document.getElementById("mineCount").setAttribute('style', 'display:none');
    document.getElementById("titleBar").setAttribute('style', 'display:none');
    if (winOrLose) {
        document.getElementById("endState").innerHTML = "<b>YOU WIN!</b>";
        if (Number(localStorage.getItem(String(boardHeight + "x" + boardWidth + " + " + Flags.length))) <= time) {
            localStorage.setItem(String(boardHeight + "x" + boardWidth + " + " + Flags.length), time);
            document.getElementById("recordState").innerHTML = "Record: " + (time / 10) + " seconds";
        } else {
            document.getElementById("recordState").innerHTML = "Record: " + (Number(localStorage.getItem(String(boardHeight + "x" + boardWidth + "+" + Flags.length))) / 10) + " seconds";
        }
    } else {
        document.getElementById("endState").innerHTML = "<b>YOU LOST</b>";
        document.getElementById("recordState").innerHTML = "Record: " + (Number(localStorage.getItem(String(boardHeight + "x" + boardWidth + "+" + Flags.length))) / 10) + " seconds";
    }
    document.getElementById("timeState").innerHTML = "Time: " + (time / 10) + " seconds";
    document.getElementById("boardState").innerHTML = "Board: " + boardHeight + " x " + boardWidth + ", " + Flags.length + " mines";
}

var startjQuery = function () {
    $("td").click(function () {
        if (!gameStarted) {
            startGame(idToCoords($(this).attr("id"))[0], idToCoords($(this).attr("id"))[1]);
        }
        if (gameRunning) {
            whichMine = -1;
            openSquare(idToCoords($(this).attr("id"))[0], idToCoords($(this).attr("id"))[1]);
            if (checkWin()) {
                gameRunning = false;
                document.getElementById("titleBar").innerHTML = "WIN";
                setTimeout(showEnd, 500, true);
            }
        }
    });
    $("td").contextmenu(function () {
        event.preventDefault();
        if (gameRunning) {
            markSquare(idToCoords($(this).attr("id"))[0], idToCoords($(this).attr("id"))[1]);
            if (checkWin()) {
                gameRunning = false;
                document.getElementById("titleBar").innerHTML = "WIN";
                setTimeout(showEnd, 500, true);
            }
        }
    });
    $("td").dblclick(function () {
        if (gameRunning) {
        whichMine = -1;
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    if (!(i === 0 && j === 0)) {
                        if (idToCoords($(this).attr("id"))[0] + i >= 0 && idToCoords($(this).attr("id"))[0] + i < boardHeight) {
                            if (idToCoords($(this).attr("id"))[1] + j >= 0 && idToCoords($(this).attr("id"))[1] + j < boardWidth) {
                                openSquare(idToCoords($(this).attr("id"))[0] + i, idToCoords($(this).attr("id"))[1] + j);
                            }
                        }
                    }
                }
            }
        }
        if (checkWin()) {
            gameRunning = false;
            document.getElementById("titleBar").innerHTML = "WIN";
            setTimeout(showEnd, 500, true);
        }
    });
};

newGame(9, 9, 10);