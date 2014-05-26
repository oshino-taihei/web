/*
 * ==========================
 * グローバル変数
 * ==========================
 */
const N = 8;
const EMPTY = 'empty';
const WHITE = 'white';
const BLACK = 'black';

var board = initBoard(N);
var player = BLACK;

/*
 * -------------------------------
 * ボードを初期化する
 * -------------------------------
 */
function initBoard(size) {
  var board  = [size];
  var x = 0;
  var y = 0;
  for (var x = 0; x < size; x++) {
    board[x] = []
    for (var y = 0; y < size; y++) {
      board[x][y] = EMPTY;
    }
  }

  xhalf = x >> 1;
  yhalf = y >> 1;
  board[xhalf - 1][yhalf - 1] = WHITE;
  board[xhalf][yhalf - 1] = BLACK;
  board[xhalf - 1][yhalf] = BLACK;
  board[xhalf][yhalf] = WHITE;
  
  return board;
}


/*
 * -------------------------------
 * ボードを描画する
 * -------------------------------
 */
function drawGameBoard() {
  /* ゲームボードを描画する */
  var ss = [];
  ss.push('<table>');
  for (var y = -1; y < N; y++) {
    ss.push('<tr>');
    for (var x = -1; x < N; x++) {
      if (0 <= y && 0 <= x) {
        ss.push('<td class="');
        ss.push('cell');
        ss.push(' ');
        ss.push(board[x][y]);
        ss.push('">');
        ss.push('<span class="disc" onClick="putStone(' + x + ',' + y + ');"></span>');
        ss.push('</td>');
      } else if (0 <= x && y == -1) {
        ss.push('<th>' + 'abcdefgh'[x] + '</th>');
      } else if (x == -1 && 0 <= y) {
        ss.push('<th>' + '12345678'[y] + '</th>');
      } else /* if (x == -1 && y == -1) */ {
        ss.push('<th></th>');
      }
    }
    ss.push('</tr>');
  }
  ss.push('</table>');
  
  /* 情報を表示する */
  ss.push('<div id="info">PLAYER: ' + player + '</div>');

  document.getElementById('main').innerHTML = ss.join('');
}

/*
 * -------------------------------
 * ある点に着手したときに返される石のリストを取得する
 * -------------------------------
 */
function getCoveredStones(x,y) {
  var seeds = [];
  if (board[x][y] != EMPTY) {
    return seeds;
  }

  // 上方向
  for (var i = y; i > 0; i--) {
    if (board[x][i] == player) {
      for (var j = y-1; j > i; j--) {
        seeds.push([x,j]);
      }
      continue;
    }
  }
  // 下方向
  for (var i = y; i < N; i++) {
    if (board[x][i] == player) {
      for (var j = y+1; j < i; j++) {
        seeds.push([x,j]);
      }
      continue;
    }
  }
  // 左方向
  for (var i = x; i > 0; i--) {
    if (board[i][y] == player) {
      for (var j = x-1; j > i; j--) {
        seeds.push([j,y]);
      }
      continue;
    }
  }
  // 右方向
  for (var i = x; i < N; i++) {
    if (board[i][y] == player) {
      for (var j = x+1; j < i; j++) {
        seeds.push([j,y]);
      }
      continue;
    }
  }

  return seeds;
}

/*
 * -------------------------------
 * 着手する
 * -------------------------------
 */
function putStone(x,y) {
  var seeds = getCoveredStones(x,y);
  if (seeds.length == 0) {
    return -1;
  }

  board[x][y] = player;
  for (var i = 0; i < seeds.length; i++) {
    console.log(getOthelloCell(seeds[i][0], seeds[i][1]));
    board[seeds[i][0]][seeds[i][1]] = player;
  }

  // 再描画
  drawGameBoard();

  // 手順を交代する
  nextTurn();

  return 0;
}

/*
 * -------------------------------
 * 次のターンに進む(プレイヤーを交代する)
 * -------------------------------
 */
function nextTurn() {
  if (player == WHITE) {
    player = BLACK;
  } else if (player == BLACK) {
    player = WHITE;
  }
}



/*
 * -------------------------------
 * boardの座標を入力として、オセロボードの座標に変換する
 * -------------------------------
 */
function getOthelloCell(x,y) {
  var oX = 'abcdefgh'[x];
  var oY = '12345678'[y];
  return [oX, oY];
}
/*
 * -------------------------------
 * デバッグ情報を出力する
 * -------------------------------
 */
function debugInfo() {
  console.log(board);
}


/*
 * ============
 * MAIN
 * ============
 */

const N = 8;
var board = initBoard(N);
drawGameBoard(board);
