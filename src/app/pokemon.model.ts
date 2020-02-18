export class Pokemon {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public frontImg: string,
    public move1: string,
    public move2: string,
    public move3: string,
    public move4?: string,
    public backImg?: string,
  ) { }
}