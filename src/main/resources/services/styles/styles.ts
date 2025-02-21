import * as config from "../../highlight-config.json";
import { createResponseItem } from "/lib/service-utils";
import { CustomSelectorServiceParams, CustomSelectorServiceResponseBody } from "@item-enonic-types/global/controller";
import type { Request, Response } from "@enonic-types/core";

export function get(
  req: Request<{ params: CustomSelectorServiceParams }>,
): Response<{ body: CustomSelectorServiceResponseBody }> {
  const query = req.params.query !== undefined ? req.params.query.toLowerCase() : "";

  const hits = config.cssFiles
    .map((fileName) => createResponseItem(fileName.replace(".min.css", "")))
    .filter((item) => item.displayName.toLowerCase().indexOf(query) !== -1);

  return {
    status: 200,
    body: {
      total: config.cssFiles.length,
      count: hits.length,
      hits: hits,
    },
  };
}
