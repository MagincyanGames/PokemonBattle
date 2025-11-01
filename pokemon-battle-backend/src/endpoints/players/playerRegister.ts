import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Result, type AppContext } from "../../types";
import { guid, uuidv4 } from "zod/v4";
import { v4 as uuid } from "uuid";
import { Battle, BattleCreateDTO, BattleType } from "../../types/battles";
import { BattleService } from "../../services/battleService";

export class PlayerRegister extends OpenAPIRoute {
  schema = {
    tags: ["Players"],
    summary: "Create a new Battle",
    request: {
      body: {
        content: {
          "application/json": {
            schema: BattleCreateDTO, // TODO cambiar el esquema de entrada
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
                  battle: Battle, // TODO cambiar el esquema de salida
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
  ): Result<BattleType> {
    const data = await this.getValidatedData<typeof this.schema>();

    const battleToCreate = data.body;

    // TODO agregar validación
    battleService.Create(battleToCreate);

    return {
      success: true,
      obj: {
        name: battleToCreate.name,
        guid: uuid(),
        players: [],
      },
    };
  }
}
