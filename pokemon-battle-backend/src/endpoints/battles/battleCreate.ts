import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Result, type AppContext } from "../../types";
import { guid, uuidv4 } from "zod/v4";
import { v4 } from "uuid";
import { Battle, BattleType } from "../../types/battles";
import { BattleService } from "../../services/battleService";

export class BattleCreate extends OpenAPIRoute {
  schema = {
    tags: ["Battles"],
    summary: "Create a new Battle",
    request: {
      body: {
        content: {
          "application/json": {
            schema: Battle,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the created task",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  battle: Battle,
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext): Result<BattleType> {
    var battleService = BattleService.FromCtx(c);

    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated request body
    const battleToCreate = data.body;

    // TODO agregar validación
    battleService.Push(battleToCreate);
    // if (!c.env.battles) c.env.battles = [];
    // c.env.battles.push(battleToCreate);

    return {
      success: true,
      obj: {
        name: battleToCreate.name,
        guid: v4(),
      },
    };
  }
}
