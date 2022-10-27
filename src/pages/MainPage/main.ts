import Board from './grid';

class Main {
  size: number;
  startData: number;
  board: Board;
  constructor(size: number) {
    this.size = size;
    this.startData = 2;
    this.init();
  }

  init() {
    this.board = new Board(this.size);
    this.setDataRandom();
  }

  /** 随机填充 */
  setDataRandom() {
    for (let i = 0; i < this.startData; i++) {
      this.addRandomData();
    }
  }

  /** 填充数据 */
  addRandomData() {
    if (!this.board.cellEmpty()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const cell = this.board.selectCell();
      cell.val = value;
      this.update(cell);
    }
  }

  /** 更新数据 */
  update(cell) {
    this.board.grid[cell.x][cell.y] = cell.val;
  }

  move(dir) {
    // 0:上, 1:右, 2:下, 3:左
    const curList = this.formList(dir);
    const list = this.combine(curList);
    const result: number[][] = [[], [], [], []];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        switch (dir) {
          case 0:
            result[i][j] = list[j][i];
            break;
          case 1:
            result[i][j] = list[i][this.size - 1 - j];
            break;
          case 2:
            result[i][j] = list[j][this.size - 1 - i];
            break;
          case 3:
            result[i][j] = list[i][j];
            break;
          default:
            break;
        }
      }
    }
    this.board.grid = result;
    this.setDataRandom();

    return result;
  }

  formList(dir) {
    // 根据滑动方向生成list的四个数组
    const list: Array<Array<number | string>> = [[], [], [], []];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        switch (dir) {
          case 0:
            list[i].push(this.board.grid[j][i]);
            break;
          case 1:
            list[i].push(this.board.grid[i][this.size - 1 - j]);
            break;
          case 2:
            list[i].push(this.board.grid[this.size - 1 - j][i]);
            break;
          case 3:
            list[i].push(this.board.grid[i][j]);
            break;
          default:
            break;
        }
      }
    }
    return list;
  }

  combine(list) {
    // 滑动时相同的合并
    // 数字靠边
    for (let i = 0; i < list.length; i++) {
      list[i] = this.changeItem(list[i]);
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (list[i][j - 1] == list[i][j] && list[i][j] != '') {
          list[i][j - 1] += list[i][j];
          list[i][j] = '';
        }
      }
    }
    // 再次数字靠边
    for (let i = 0; i < list.length; i++) {
      list[i] = this.changeItem(list[i]);
    }

    return list;
  }

  changeItem(item) {
    // 将 ['', 2, '', 2] 改为 [2, 2, '', '']
    let cnt = 0;
    for (let i = 0; i < item.length; i++) if (item[i] !== '') item[cnt++] = item[i];
    for (let j = cnt; j < item.length; j++) item[j] = '';
    return item;
  }

  isOver() {
    // 游戏是否结束，结束条件：可用格子为空且所有格子上下左右值不等
    if (!this.board.cellEmpty()) {
      return false;
    } else {
      // 左右不等
      for (let i = 0; i < this.size; i++) {
        for (let j = 1; j < this.size; j++) {
          if (this.board.grid[i][j] == this.board.grid[i][j - 1]) return false;
        }
      }
      // 上下不等
      for (let j = 0; j < this.size; j++) {
        for (let i = 1; i < this.size; i++) {
          if (this.board.grid[i][j] == this.board.grid[i - 1][j]) return false;
        }
      }
    }
    return true;
  }
}

export default Main;
