import { GameField, Orientation } from './field';

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

  move(index: number, to: number, direction: Orientation): boolean {
    return this.gameField.takeStones(index, to, direction);
  }

  toString() {
    let output = '';
    for (let row of this.gameField.field) {
      output += row.map((stone) => stone.state).join(' ') + '\n';
    }
    return output;
  }
}
