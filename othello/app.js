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
 * 着手する
 * -------------------------------
 */
function putStone(x,y) {
  board[x][y] = player;
  nextTurn();
  drawGameBoard();
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
