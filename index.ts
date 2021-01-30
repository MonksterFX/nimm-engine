import { GameField } from './src/field';
import { Stone } from './src/stone';

export interface GameOptions {
  size: [row: number, column: number];
}

// main class
export class GameState {
  readonly options: GameOptions;
  protected gameField: GameField;

  constructor(options: GameOptions) {
    this.options = options;
    this.gameField = new GameField(options);
  }

  toString() {
    let output = '';
    for (let row of this.gameField.field) {
      output += row.map((stone) => stone.state).join(' ') + '\n';
    }
    return output;
  }
}
