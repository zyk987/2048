class Board {
  size: number;
  grid: Array<Array<number | string>>;
  constructor(size) {
    this.size = size;
    this.grid = this.init();
  }

  init() {
    const grid: Array<Array<number | string>> = [];
    for (let i = 0; i < this.size; i++) {
      grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        grid[i].push('');
      }
    }
    return grid;
  }

  /** 记录空格子 */
  usefulCell() {
    const cells: Array<{ x: number; y: number; val: number }> = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === '') {
          cells.push({
            x: i,
            y: j,
            val: 0,
          });
        }
      }
    }
    return cells;
  }

  /** 随机选择一个格子 */
  selectCell() {
    const cells = this.usefulCell();
    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
    return { val: 0 };
  }

  /** 可用格子是否为空，为空返回true */
  cellEmpty() {
    return !this.usefulCell().length;
  }
}

export default Board;
