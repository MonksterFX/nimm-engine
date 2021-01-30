export enum StoneState {
  DELETED = 0,
  PLACED = 1,
}

export class StoneFactory {
  private currentId: number;

  constructor() {
    this.currentId = 0;
  }

  createStone(row: number, col: number) {
    const stone = new Stone(this.currentId, row, col);
    this.currentId++;
    return stone;
  }
}

export class Stone {
  static id = 0;
  row: number;
  col: number;
  state: StoneState;
  _id: number;

  constructor(_id: number, row: number, col: number) {
    this.row = row;
    this.col = col;
    this.state = StoneState.PLACED;
    this._id = _id;
  }
}
