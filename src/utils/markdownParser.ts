import { marked, type Renderer, type Tokens } from "marked";

type HeadingClasses = {
  [key in 1 | 2 | 3 | 4 | 5 | 6]: string;
};

const headingClasses: HeadingClasses = {
  1: "text-2xl font-bold mb-3 mt-4",
  2: "text-xl font-bold mb-2 mt-3",
  3: "text-lg font-bold mb-2 mt-3",
  4: "text-base font-bold mb-2 mt-3",
  5: "text-sm font-bold mb-2 mt-3",
  6: "text-xs font-bold mb-2 mt-3",
};

const customRenderer: Partial<Renderer> = {
  heading: function (this: Renderer, token: Tokens.Heading): string {
    const text = this.parser.parseInline(token.tokens || []);
    return `<h${token.depth} class="${
      headingClasses[token.depth as keyof HeadingClasses]
    }">${text}</h${token.depth}>`;
  },

  paragraph: function (this: Renderer, token: Tokens.Paragraph): string {
    const text = this.parser.parseInline(token.tokens || []);
    return `<p class="my-2 text-base">${text}</p>`;
  },

  strong: function (this: Renderer, token: Tokens.Strong): string {
    const text = this.parser.parseInline(token.tokens || []);
    return `<strong class="font-bold">${text}</strong>`;
  },

  em: function (this: Renderer, token: Tokens.Em): string {
    const text = this.parser.parseInline(token.tokens || []);
    return `<em class="italic">${text}</em>`;
  },

  codespan: (token: Tokens.Codespan): string => {
    return `<code class="bg-gray-100 px-1 rounded text-base font-mono">${token.text}</code>`;
  },

  code: (token: Tokens.Code): string => {
    const language = token.lang ? ` language-${token.lang}` : "";
    return `<pre class="bg-gray-100 p-2 rounded text-base font-mono my-2 overflow-x-auto"><code class="${language}">${token.text}</code></pre>`;
  },

  list: function (this: Renderer, token: Tokens.List): string {
    const tag = token.ordered ? "ol" : "ul";
    const startAttr =
      token.ordered && token.start !== 1 ? ` start="${token.start}"` : "";
    const listTypeClass = token.ordered ? "list-decimal" : "list-disc";

    const items = token.items
      .map((item) => {
        return this.listitem(item);
      })
      .join("");

    return `<${tag} class="${listTypeClass} list-inside mb-2 ml-4"${startAttr}>${items}</${tag}>`;
  },

  listitem: function (this: Renderer, token: Tokens.ListItem): string {
    let text = "";

    if (token.tokens && token.tokens.length > 0) {
      text = this.parser.parse(token.tokens);
    } else if (token.text) {
      text = token.text;
    }

    text = text.replace(/^<p[^>]*>|<\/p>$/g, "");

    return `<li class="mb-1">${text}</li>`;
  },

  blockquote: function (this: Renderer, token: Tokens.Blockquote): string {
    const text = this.parser.parse(token.tokens || []);
    return `<blockquote class="border-l-4 border-gray-300 pl-4 my-2 italic">${text}</blockquote>`;
  },

  link: function (this: Renderer, token: Tokens.Link): string {
    const text = this.parser.parseInline(token.tokens || []);
    const href = token.href;
    const title = token.title ? ` title="${token.title}"` : "";
    return `<a href="${href}" class="text-blue-600 hover:text-blue-800 underline"${title}>${text}</a>`;
  },

  image: (token: Tokens.Image): string => {
    const title = token.title ? ` title="${token.title}"` : "";
    const alt = token.text || "";
    return `<img src="${token.href}" alt="${alt}" class="max-w-full h-auto my-2"${title}>`;
  },

  hr: (): string => {
    return `<hr class="border-t border-gray-300 my-4">`;
  },

  table: function (this: Renderer, token: Tokens.Table): string {
    let header = "";
    let body = "";

    if (token.header && token.header.length > 0) {
      const headerRow = token.header
        .map((cell) => {
          const text = this.parser.parseInline(cell.tokens || []);
          return `<th class="border border-gray-300 px-2 py-1 bg-gray-100 font-bold">${text}</th>`;
        })
        .join("");
      header = `<thead><tr>${headerRow}</tr></thead>`;
    }

    if (token.rows && token.rows.length > 0) {
      const rows = token.rows
        .map((row) => {
          const cells = row
            .map((cell) => {
              const text = this.parser.parseInline(cell.tokens || []);
              return `<td class="border border-gray-300 px-2 py-1">${text}</td>`;
            })
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      body = `<tbody>${rows}</tbody>`;
    }

    return `<table class="border-collapse border border-gray-300 my-2 w-full">${header}${body}</table>`;
  },
};

marked.use({
  gfm: true,
  breaks: true,
  renderer: customRenderer,
});

export const parseMarkdownToHtml = (markdownText: string): string => {
  if (markdownText.includes("Acabás de enviar un zumbido.")) {
    return markdownText;
  }

  if (typeof markdownText !== "string") {
    console.error(
      "parseMarkdownToHtml received non-string input:",
      markdownText
    );
    return "";
  }

  try {
    return marked.parse(markdownText) as string;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return markdownText;
  }
};
