import { getSiteConfig, assetUrl } from "/lib/xp/portal";
import * as config from "../../../highlight-config.json";
import type { Response } from "@enonic-types/core";
import type { MacroContext } from "@item-enonic-types/global/controller";
import type { Highlight } from ".";

export function macro(context: MacroContext<Highlight>): Response {
  const language = context.params.language || "javascript";

  return {
    body: wrapInPreAndCodeTags(language, stripCodeAndPreTags(context.body), config.version),
    pageContributions: {
      headEnd: [
        `<link rel="stylesheet" href="${assetUrl({ path: `highlight.js/${config.version}/styles/${getStylesheet()}.min.css` })}"/>`,
        `<link rel="stylesheet" href="${assetUrl({ path: "lib-highlight/style.css" })}"/>`,
      ],
      bodyEnd: [`<script type="module" src="${assetUrl({ path: "highlight-code.mjs" })}"></script>`],
    },
  };
}

function wrapInPreAndCodeTags(language: string, body: string, version: string): string {
  const languagePackUrl = assetUrl({
    path: `highlight.js/${version}/es/languages/${language}.js`,
  });

  return `
    <div class="highlighted">
      <highlight-code language="${language}" language-pack-url="${languagePackUrl}">
        <pre style="padding: 0;"><code class="language-${language}">${body}</code></pre>
      </highlight-code>
    </div>`;
}

function stripCodeAndPreTags(str: string): string {
  return str.replace(/(<code>)|(<\/code>|<pre>|<\/pre>|<p>|<\/p>)/gm, "").trim();
}

function getStylesheet(): string {
  return getSiteConfig<XP.SiteConfig>()?.stylesheet || "default.css"; // || ensures handles empty strings since they are falsy
}
