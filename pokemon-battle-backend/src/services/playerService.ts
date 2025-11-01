import { v4 as uuid } from "uuid";
import { AppContext, EnsureServices } from "../types";
import { BattleCreateType, BattleType } from "../types/battles";
import { PlayerType } from "../types/player";

export class PlayerService {
  playerList: PlayerType[] = [];
  context?: AppContext = undefined;

  getByGUID(guid: string): PlayerType | undefined {
    for (let e of this.playerList) {
      if (e.guid === guid) return e;
    }

    return undefined;
  }

  getArrayByGUID(guids: string[]): PlayerType[] {
    let res: PlayerType[] = [];

    for (let e of this.playerList) {
      if (e.guid in guids) res.push(e);
    }

    return res;
  }

  @EnsureServices()
  static FromCtx(c: AppContext) {
    return c.env.services.playerService;
  }

  static Use() {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const context = args[0] as AppContext;
        const bs = PlayerService.FromCtx(context);
        bs.context = context;

        const newArgs = [...args, bs];
        return originalMethod.apply(this, newArgs);
      };
      return descriptor;
    };
  }
}
