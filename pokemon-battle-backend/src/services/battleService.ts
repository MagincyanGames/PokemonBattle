import { v4 as uuid } from "uuid";
import { AppContext } from "../types";
import { BattleCreateType, BattleType } from "../types/battles";

export class BattleService {
  battleList: BattleType[] = [];

  public Create(battle: BattleCreateType) {
    let genBattle: BattleType = {
      ...battle,
      guid: uuid()
    }
  }

  public Push(battle: BattleType) {
    this.battleList.push(battle);
  }

  static FromCtx(c: AppContext) {
    if (!c.env.services.battleService)
      c.env.services.battleService = new BattleService();
    return c.env.services.battleService;
  }
}
