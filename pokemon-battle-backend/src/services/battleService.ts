import { v4 as uuid } from "uuid";
import { AppContext, EnsureServices } from "../types";
import { BattleCreateType, BattleRaw, BattleType } from "../types/battles";
import { PlayerService } from "./playerService";
import { Player, PlayerType } from "../types/player";

export class BattleService {
  battleList: BattleRaw[] = [];
  context?: AppContext = undefined;

  /* -------------------- */
  /* ---- OPERATIONS ---- */
  /* -------------------- */

  public Create(battle: BattleCreateType) {
    this.battleList.push({
      name: battle.name,
      guid: uuid(),
      players: [],
    });
  }

  public List() {
    return this.battleList.map((battle) => this.enrichRaw(battle));
  }

  /* --------------- */
  /* ---- UTILS ---- */
  /* --------------- */
  constructor(context: AppContext) {
    this.context = context;
  }

  public enrichRaw(battle: BattleRaw): BattleType {
    const playerService = PlayerService.FromCtx(this.context!); // TODO Mejorar check
    let players: PlayerType[] = playerService.getArrayByGUID(battle.players);

    return {
      name: battle.name,
      guid: battle.guid,
      players,
    };
  }

  public enpoorFull(battle: BattleType): BattleRaw {
    return {
      name: battle.name,
      guid: battle.guid,
      players: battle.players.map((p) => p.guid),
    };
  }

  @EnsureServices()
  static FromCtx(c: AppContext) {
    return c.env.services.battleService;
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
        const bs = BattleService.FromCtx(context);

        const newArgs = [...args, bs];
        return originalMethod.apply(this, newArgs);
      };
      return descriptor;
    };
  }
}
