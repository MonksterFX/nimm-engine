import { GameOptions, GameState } from './src/state';

const options: GameOptions = { size: [10, 10] };
const game = new GameState(options);

console.log('' + game);
