import { CustomSelectorServiceResponseHit } from "@item-enonic-types/global/controller";

export function createResponseItem(name: string): CustomSelectorServiceResponseHit {
  return {
    id: name,
    displayName: name.split("-").map(capitalize).join(" "),
  };
}

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
