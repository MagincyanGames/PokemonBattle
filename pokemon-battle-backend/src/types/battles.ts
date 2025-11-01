import { Str } from "chanfana";
import z from "zod";
import { Player } from "./player";

export const Battle = z.object({
  name: Str(),
  guid: Str(),

  players: Player.array(),
});

export const BattleCreateDTO = z.object({
  name: Str(),
});

export type BattleCreateType = z.infer<typeof BattleCreateDTO>;
export type BattleType = z.infer<typeof Battle>;

export type BattleRaw = {
  name: string;
  guid: string;
  players: string[];
};
