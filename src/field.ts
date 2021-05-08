import { Move } from './move';
import { GameOptions } from './state';
import { Stone, StoneFactory, StoneState } from './stone';

export enum Orientation {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BOTTOM = 3,
}

export interface Position {
  row: number;
  col: number;
}

export class GameField {
  field: Stone[][];

  constructor(options: GameOptions) {
    this.field = this.init(options);
  }

  init(options: GameOptions): Stone[][] {
    const stoneFactory = new StoneFactory();
    const gameField = [];

    for (let row = 0; row < options.size[0]; row++) {
      const rowOfStones = [];

      // generate row
      for (let column = 0; column < options.size[1]; column++) {
        rowOfStones.push(stoneFactory.createStone(row, column));
      }

      // add row to GameField
      gameField.push(rowOfStones);
    }
    return gameField;
  }

  get rowSize() {
    return this.field.length;
  }

  get columnSize() {
    return this.field[0].length;
  }

  getLineOfStones(index: number, direction: Orientation): Stone[] {
    let line: Stone[] = [];
    const reverse = this.isReverse(direction);

    if (direction === Orientation.LEFT || direction === Orientation.RIGHT) {
      line = this.getRow(index);
    } else {
      line = this.getColumn(index);
    }

    return reverse ? line.reverse() : line;
  }

  isValidMove(to: number, line: Stone[]): boolean {
    let notStarted = true;

    for (let step = 0; step <= to; step++) {
      if (line[step].state === StoneState.DELETED && !notStarted) {
        // it is not allowed to select a deleted stone/or a stone behind a deleted one
        return false;
      } else if (line[step].state === StoneState.PLACED) {
        // first stone got hit so toggle not started
        notStarted = false;
      }
    }

    return true;
  }

  takeStones(index: number, to: number, orientation: Orientation): boolean {
    const line = this.getLineOfStones(index, orientation);

    if (!this.isValidMove(to, line)) {
      console.log('invalid move');
      return false;
    }

    line
      .slice(0, to + 1)
      .forEach((stone) => (stone.state = StoneState.DELETED));

    return true;
  }

  isReverse(orientation: Orientation): boolean {
    return (
      orientation === Orientation.RIGHT || orientation === Orientation.BOTTOM
    );
  }

  getRow(index: number): Stone[] {
    // protect from change to the order of the array itself
    return [...this.field[index]];
  }

  getColumn(index: number): Stone[] {
    const col: Stone[] = [];

    for (let row of this.field) {
      col.push(row[index]);
    }

    return col;
  }

  /**
   * Convert stoneId to postion on fields
   * @param { number } id
   * @returns { Position }
   */
  stoneIdToPosition(id: number): Position {
    const row = Math.floor(id / this.rowSize);
    const col = id % this.columnSize;

    return { row, col };
  }

  /**
   * Convert position to fieldId
   * @param { number } row
   * @param { number } col
   * @returns { Position }
   */
  positionToStoneId(row: number, col: number) {
    return this.field[row][col]._id;
  }

  createMove(id: number, orientation: Orientation): Move {
    const { row, col } = this.stoneIdToPosition(id);

    let index: number;
    let to: number;

    // calculate all stone for move
    if (orientation === Orientation.LEFT || orientation === Orientation.RIGHT) {
      index = row;
      to = orientation === Orientation.LEFT ? col : this.columnSize - 1 - col;
    } else {
      index = col;
      to = orientation === Orientation.TOP ? row : this.rowSize - 1 - row;
    }

    return { index, to, orientation };
  }
}
