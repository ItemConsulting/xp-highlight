import * as config from "../../highlight-config.json";
import { capitalize } from "/lib/service-utils";
import {
  CustomSelectorServiceParams,
  CustomSelectorServiceResponseBody,
  CustomSelectorServiceResponseHit,
} from "@item-enonic-types/global/controller";
import type { Request, Response } from "@enonic-types/core";

export function get(
  req: Request<{ params: CustomSelectorServiceParams }>,
): Response<{ body: CustomSelectorServiceResponseBody }> {
  const query = req.params.query !== undefined ? req.params.query.toLowerCase() : "";

  const hits = config.cssFiles
    .map((fileName): CustomSelectorServiceResponseHit => {
      const shortName = fileName.replace(".min.css", "");
      return {
        id: shortName,
        displayName: shortName.split("-").map(capitalize).join(" "),
        description: fileName,
      };
    })
    .filter((item) => item.displayName.toLowerCase().indexOf(query) !== -1);

  return {
    status: 200,
    body: {
      total: hits.length,
      count: hits.length,
      hits: hits,
    },
  };
}
