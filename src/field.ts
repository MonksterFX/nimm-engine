import { GameOptions } from './state';
import { Stone, StoneFactory, StoneState } from './stone';

export enum Orientation {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BOTTOM = 3,
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

  isValidMove(to: number, line: Stone[]) {
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

  takeStones(index: number, to: number, direction: Orientation) {
    const line = this.getLineOfStones(index, direction);

    // guard
    if (!this.isValidMove(to, line)) return false;

    line
      .slice(0, to + 1)
      .forEach((stone) => (stone.state = StoneState.DELETED));

    return true;
  }

  isReverse(direction: Orientation) {
    return direction === Orientation.RIGHT || direction === Orientation.BOTTOM;
  }

  getRow(index: number) {
    return this.field[index];
  }

  getColumn(index: number) {
    const col: Stone[] = [];

    for (let row of this.field) {
      col.push(row[index]);
    }

    return col;
  }
}
