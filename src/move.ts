import { Orientation } from './field';

export interface Move {
  index: number;
  to: number;
  orientation: Orientation;
}
