import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../../types";
import { Battle } from "../../types/battles";

export class BattleList extends OpenAPIRoute {
  schema = {
    tags: ["Battles"],
    summary: "List Battles",
    request: {
      query: z.object({
      }),
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

  async handle(c: AppContext) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated parameters

    // Implement your own object list here

    return {
      success: true,
      battles: [], //! Utilizar el servicio
    };
  }
}
