import * as config from "../../highlight-config.json";
import { capitalize } from "/lib/service-utils";
import type { Request, Response } from "@enonic-types/core";
import type {
  CustomSelectorServiceParams,
  CustomSelectorServiceResponseBody,
  CustomSelectorServiceResponseHit,
} from "@item-enonic-types/global/controller";
import { assetUrl } from "/lib/xp/portal";

const LOGO_FILES_EXISTS = ["typescript", "java", "javascript", "scala", "python", "csharp", "haskell"];
const CORRECT_NAMES: Record<string, string> = {
  csharp: "C#",
  css: "CSS",
  fsharp: "F#",
  graphql: "GraphQL",
  javascript: "JavaScript",
  php: "PHP",
  sql: "SQL",
  typescript: "TypeScript",
  xml: "XML",
};

export function get(
  req: Request<{ params: CustomSelectorServiceParams }>,
): Response<{ body: CustomSelectorServiceResponseBody }> {
  const query = req.params.query !== undefined ? req.params.query.toLowerCase() : "";

  const hits = config.languageFiles
    .map((fileName): CustomSelectorServiceResponseHit => {
      const name = fileName.replace(".js", "");

      return {
        id: name,
        displayName: CORRECT_NAMES[name] ?? cleanName(name),
        description: name,
        iconUrl: LOGO_FILES_EXISTS.indexOf(name) !== -1 ? assetUrl({ path: `logos/${name}.svg` }) : undefined,
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

function cleanName(name: string): string {
  return name.split("-").map(capitalize).join(" ");
}
