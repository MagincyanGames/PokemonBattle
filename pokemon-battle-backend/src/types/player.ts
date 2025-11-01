import { Str } from "chanfana";
import z from "zod";

export const Player = z.object({
  guid: Str(),
  name: Str(),
});

export const PlayerCreateDTO = z.object({
  name: Str(),
});

export type PlayerType = z.infer<typeof Player>;
