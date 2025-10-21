import { Str } from "chanfana";
import z from "zod";

export const Battle = z.object({
  name: Str(),
  guid: Str(),
});

export const BattleCreateIn = z.object({
  name: Str(),
});

export type BattleType = z.infer<typeof Battle>;
