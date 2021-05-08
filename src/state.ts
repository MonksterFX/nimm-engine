import { GameField, Orientation } from './field';
import { Move } from './move';

export interface GameOptions {
  size: [row: number, column: number];
}

// main class
export class GameState {
  readonly options: GameOptions;
  readonly gameField: GameField;

  constructor(options: GameOptions) {
    this.options = options;
    this.gameField = new GameField(options);
  }

  moveWithFieldId(id: number, orientation: Orientation) {
    const move = this.gameField.createMove(id, orientation);
    return this.move(move.index, move.to, move.orientation);
  }

  move(index: number, to: number, orientation: Orientation): boolean {
    return this.gameField.takeStones(index, to, orientation);
  }

  toString() {
    let output = '';
    for (let row of this.gameField.field) {
      output += row.map((stone) => stone.state).join(' ') + '\n';
    }
    return output;
  }
}
