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
}

export default Main;
