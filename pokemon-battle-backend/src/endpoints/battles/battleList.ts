import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Result, Task } from "../../types";
import { Battle, BattleType } from "../../types/battles";
import { BattleService } from "../../services/battleService";

export class BattleList extends OpenAPIRoute {
  schema = {
    tags: ["Battles"],
    summary: "List Battles",
    request: {
      query: z.object({}),
    },
    responses: {
      "200": {
        description: "Returns a list of battles",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  battles: Battle.array(),
                }),
              }),
            }),
          },
        },
      },
    },
  };

  @BattleService.Use()
  async handle(
    _c: AppContext,
    _hono: any,
    battleService: BattleService
  ): Result<BattleType[]> {
    // Get validated data
    // const data = await this.getValidatedData<typeof this.schema>();
    return {
      success: true,
      obj: battleService.List(),
    };
  }
}
