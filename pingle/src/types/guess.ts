export class Guess {
  price: number;
  public closeness: 'near' | 'far' | 'win';
  direction: 1 | -1 | 0;

  constructor(
    price: number,
    closeness: 'near' | 'far' | 'win',
    direction: 1 | -1 | 0
  ) {
    this.price = price;
    this.closeness = closeness;
    this.direction = direction;
  }
}