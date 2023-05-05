import { Json } from "../utils";

export interface Body {
  asJson(): Json;
}

export const Bodies = {
  json(data: Json): Body {
    return {
      asJson: () => data,
    };
  },
};
