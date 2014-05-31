/*
 * ==========================
 * グローバル変数
 * ==========================
 */
const N = 8;
const EMPTY = 'empty';
const WHITE = 'white';
const BLACK = 'black';

const MODE_SOLO = 'solo';
const MODE_COM = 'com';

// 各種ボードの情報を保持
var board = [];
var player;
var mode = MODE_SOLO;
var white_num;
var black_num;

/*
 * -------------------------------
 * ボードを初期化する
 * -------------------------------
 */
function initBoard() {
  var x = 0;
  var y = 0;
  for (var x = 0; x < N; x++) {
    board[x] = [];
    for (var y = 0; y < N; y++) {
      board[x][y] = EMPTY;
    }
  }

  xhalf = x >> 1;
  yhalf = y >> 1;
  board[xhalf - 1][yhalf - 1] = WHITE;
  board[xhalf][yhalf - 1] = BLACK;
  board[xhalf - 1][yhalf] = BLACK;
  board[xhalf][yhalf] = WHITE;

  player = BLACK;
  drawGameBoard();
}


/*
 * -------------------------------
 * ボードを描画する
 * -------------------------------
 */
function drawGameBoard() {
  /* ゲームボードを描画する */
  var ss = [];
  white_num = 0;
  black_num = 0;
  ss.push('<table>');
  for (var y = -1; y < N; y++) {
    ss.push('<tr>');
    for (var x = -1; x < N; x++) {
      if (0 <= y && 0 <= x) {
        // 石の数を数える
        if (board[x][y] == WHITE) {
          white_num++;
        } else if (board[x][y] == BLACK) {
          black_num++;
        }
        // HTML生成
        ss.push('<td class="');
        ss.push('cell');
        ss.push(' ');
        if (getCoveredStones(x,y).length > 0) {
          ss.push(player + ' candi '); 
          attackable = true;
        } else {
          ss.push(board[x][y]);
        }
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
  
  // 情報を表示する
  ss.push('</br>');
  ss.push('<table>');
  ss.push('<tr>');
  ss.push('<th>white</th>');
  ss.push('<th>black</th>');
  ss.push('</tr>');
  ss.push('<tr>');
  ss.push('<td class="info white"><span class="disc"></span></td>');
  ss.push('<td class="info black"><span class="disc"></span></td>');
  ss.push('</tr>');
  ss.push('<tr>');
  ss.push('<td><span class="score">' + white_num + '</span></td>');
  ss.push('<td><span class="score">' + black_num + '</span></td>');
  ss.push('</tr>');
  ss.push('</table>');
  
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

  var opponent = getOpponent();
  // 上方向
  for (var i = y-1; i > 0; i--) {
    if (board[x][i] == player) {
      for (var j = y-1; j > i && board[x][j] == opponent; j--) {
         seeds.push([x,j]);
      }
      break;
    } else if (board[x][i] == EMPTY) {
      break;
    }
  }
  // 下方向
  for (var i = y+1; i < N; i++) {
    if (board[x][i] == player) {
      for (var j = y+1; j < i && board[x][j] == opponent; j++) {
        seeds.push([x,j]);
      }
      break;
    } else if (board[x][i] == EMPTY) {
      break;
    }
  }
  // 左方向
  for (var i = x-1; i > 0; i--) {
    if (board[i][y] == player) {
      for (var j = x-1; j > i && board[j][y] == opponent; j--) {
        seeds.push([j,y]);
      }
      break;
    } else if (board[i][y] == EMPTY) {
      break;
    }
  }
  // 右方向
  for (var i = x+1; i < N; i++) {
    if (board[i][y] == player) {
      for (var j = x+1; j < i && board[j][y] == opponent; j++) {
        seeds.push([j,y]);
      }
      break;
    } else if (board[i][y] == EMPTY) {
      break;
    }
  }
  // 右上方向
  for (var i = 1; x+i < N && y-i > 0; i++) {
    if (board[x+i][y-i] == player) {
      for (var j = 1; j < i && board[x+j][y-j] == opponent; j++) {
        seeds.push([x+j, y-j]);
      }
      break;
    } else if (board[x+i][y-i] == EMPTY) {
      break;
    }
  }
  // 右下方向
  for (var i = 1; x+i < N && y+i < N; i++) {
    if (board[x+i][y+i] == player) {
      for (var j = 1; j < i && board[x+j][y+j] == opponent; j++) {
        seeds.push([x+j, y+j]);
      }
      break;
    } else if (board[x+i][y+i] == EMPTY) {
      break;
    }
  }
  // 左上方向
  for (var i = 1; x-i > 0 && y+i < N; i++) {
    if (board[x-i][y+i] == player) {
      for (var j = 1; j < i && board[x-j][y+j] == opponent; j++) {
        seeds.push([x-j, y+j]);
      }
      break;
    } else if (board[x-i][y+i] == EMPTY) {
      break;
    }
  }
  // 左下方向
  for (var i = 1; x-i > 0 && y-i > 0; i++) {
    if (board[x-i][y-i] == player) {
      for (var j = 1; j < i && board[x-j][y-j] == opponent; j++) {
        seeds.push([x-j, y-j]);
      }
      break;
    } else if (board[x-i][y-i] == EMPTY) {
      break;
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
    board[seeds[i][0]][seeds[i][1]] = player;
  }

  // 手順を交代する
  nextTurn();

  // 再描画
  drawGameBoard();

  return 0;
}

/*
 * -------------------------------
 * 対戦相手(の色)を取得する
 * -------------------------------
 */
function getOpponent() {
  if (player == WHITE) {
    return BLACK;
  } else if (player == BLACK) {
    return WHITE;
  }
}

/*
 * -------------------------------
 * 着手可能手があればtrue,なければfalse
 * -------------------------------
 */
function isAttackable() {
  for (var x = 0; x < N; x++){
    for (var y = 0; y < N; y++) {
      if (getCoveredStones(x,y).length > 0) {
        return true;
      }
    }
  }
  return false;
}

/*
 * -------------------------------
 * 次のターンに進む(プレイヤーを交代する)
 * -------------------------------
 */
function nextTurn() {
  player = getOpponent();
  if (!isAttackable()) {
    player = getOpponent();
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

initBoard();
