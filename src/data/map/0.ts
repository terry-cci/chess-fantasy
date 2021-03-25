import Victor from "victor";
import { General, Soldier } from "../../components/chess";

export const tileMap = `11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111211111
11111111111
`;

export const chesses = [
  new General(new Victor(5, 11)),
  new Soldier(new Victor(1, 6)),
  new Soldier(new Victor(3, 6)),
  new Soldier(new Victor(5, 6)),
  new Soldier(new Victor(7, 6)),
  new Soldier(new Victor(9, 6)),
];
