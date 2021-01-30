import { Orientation } from './src/field';
import { GameState } from './src/state';

const game = new GameState({ size: [5, 5] });
const directionMapper: { [id: string]: Orientation } = {
  r: Orientation.RIGHT,
  l: Orientation.LEFT,
  t: Orientation.TOP,
  b: Orientation.BOTTOM,
};

// CLI
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Next Move?\n',
});

// first print
console.log('' + game);

rl.prompt();

// this is a loop
rl.on('line', (line: string) => {
  try {
    // parse input - todo: more verbose
    let [directionRaw, indexRaw, toRaw] = line.trim().split('.');

    let direction = directionMapper[directionRaw.toLowerCase()];
    let index = parseInt(indexRaw);
    let to = parseInt(toRaw);

    game.move(index, to, direction);

    console.log('' + game);

    // gamelogic
  } catch (error) {
    console.error();
  }

  rl.prompt();
}).on('close', () => {
  console.log('Thanks for playing NIM!');
  process.exit(0);
});
