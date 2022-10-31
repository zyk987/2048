export interface GridAttribute {
  pos: [number, number];
  from?: [number, number];
  value: number | string;
  status?: string;
}

const defaultAttribute: GridAttribute = {
  pos: [-1, -1],
  from: [-1, -1],
  value: '',
  status: undefined,
};

class Board {
  size: number;
  grid: GridAttribute[][];
  constructor(size) {
    this.size = size;
    this.grid = this.init();
  }

  init() {
    const grid: GridAttribute[][] = [];
    for (let i = 0; i < this.size; i++) {
      grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        grid[i].push(defaultAttribute);
      }
    }
    return grid;
  }

  /** 记录空格子 */
  usefulCell() {
    const cells: GridAttribute[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[j][i].value === '') {
          cells.push({
            pos: [i, j],
            value: -1,
          });
        }
      }
    }
    return cells;
  }

  /** 随机选择一个格子 */
  selectCell(): GridAttribute {
    const cells = this.usefulCell();
    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
    return defaultAttribute;
  }

  /** 可用格子是否为空，为空返回true */
  cellEmpty() {
    return !this.usefulCell().length;
  }
}

export default Board;
