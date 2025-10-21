import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";
import { BattleType } from "./types/battles";
import { BattleService } from "./services/battleService";

export interface Env {
  services: {
    battleService: BattleService;
  };
}

export type AppContext = Context<{
  Bindings: Env;
}>;

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});

export type Result<T> = Promise<{
  success: boolean;
  obj: T;
}>;
