import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";
import { BattleType } from "./types/battles";
import { BattleService } from "./services/battleService";
import { PlayerService } from "./services/playerService";

export interface Env {
  services: {
    playerService: PlayerService;
    battleService: BattleService;
  };
}

export function CheckServices(c: AppContext) {
  if (!c.env.services)
    c.env.services = {
      playerService: new PlayerService(),
      battleService: new BattleService(c),
    };
}

export function EnsureServices() {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const context = args[0] as AppContext;
      CheckServices(context);
      return originalMethod.apply(this, args);
    };
    return descriptor;
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
