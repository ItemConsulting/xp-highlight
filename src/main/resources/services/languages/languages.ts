import * as config from "../../highlight-config.json";
import { createResponseItem } from "/lib/service-utils";
import type { Request, Response } from "@enonic-types/core";
import type {
  CustomSelectorServiceParams,
  CustomSelectorServiceResponseBody,
} from "@item-enonic-types/global/controller";

export function get(
  req: Request<{ params: CustomSelectorServiceParams }>,
): Response<{ body: CustomSelectorServiceResponseBody }> {
  const query = req.params.query !== undefined ? req.params.query.toLowerCase() : "";

  const hits = config.languageFiles
    .map((fileName) => createResponseItem(fileName.replace(".js", "")))
    .filter((item) => item.displayName.toLowerCase().indexOf(query) !== -1);

  return {
    status: 200,
    body: {
      total: config.languageFiles.length,
      count: hits.length,
      hits: hits,
    },
  };
}
