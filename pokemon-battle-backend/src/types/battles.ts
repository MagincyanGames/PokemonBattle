import { Str } from "chanfana";
import z from "zod";

export const Battle = z.object({
  name: Str(),
  guid: Str(),
});

export const BattleCreate = z.object({
  name: Str(), 
});

export type BattleCreateType = z.infer<typeof BattleCreate>
export type BattleType = z.infer<typeof Battle>;
