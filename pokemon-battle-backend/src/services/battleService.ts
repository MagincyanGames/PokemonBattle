import { AppContext } from "../types";
import { BattleType } from "../types/battles";

export class BattleService {
  battleList: BattleType[] = [];

  public Push(battle: BattleType) {
    this.battleList.push(battle);
  }

  static FromCtx(c: AppContext) {
    if (!c.env.services.battleService)
      c.env.services.battleService = new BattleService();
    return c.env.services.battleService;
  }
}
