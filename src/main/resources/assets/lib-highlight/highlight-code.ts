import hljs from "highlight.js";

const HighlightCode = class extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const el = this.querySelector<HTMLElement>("code");

    const language = this.getAttribute("language");
    const languagePackUrl = this.getAttribute("language-pack-url");

    if (language && languagePackUrl && !hljs.listLanguages().includes(language)) {
      import(languagePackUrl).then((pack) => {
        hljs.registerLanguage(language, pack);
      });
    }

    if (el) {
      hljs.highlightElement(el);
    }
  }
};

customElements.define("highlight-code", HighlightCode);
