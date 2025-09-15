import { addFontToHead } from "./utils/addFontToHead";
import { listenForMessageFromParent } from "./utils/listenForMessageFromParent";
import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";

export function MCPUITalk() {
    function slide(child: string) {
        return `<section class="slide">${child}</section>`;
    }

    const slide1 = `
<h2>Slide One</h2>
<p>content.</p>
`;
    const slide2 = `
<h2>Slide Two</h2>
<p>content.</p>
`;

    const html = `
<article class="mcp-ui-container">
  <div class="dark-container">
    <div class="header">
      <h1>MCP UI Talk</h1>
    </div>

    <div class="deck">
      ${slide(slide1)}
      ${slide(slide2)}
    </div>
  </div>
</article>
`;

    const styles = `
<style>
* {
box-sizing: border-box;
margin: 0;
padding: 0;
}

:root {
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-feature-settings: 'liga' 1, 'calt' 1;
}

/* Dark theme (default) */
:root,
[data-theme="dark"] {
--bg-primary: #0f0f0f;
--bg-secondary: #1a1a1a;
--bg-tertiary: #2a2a2a;
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
--accent-color: #3b82f6;
--accent-hover: #60a5fa;
--border-color: #333333;
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}

/* Light theme */
[data-theme="light"] {
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--bg-tertiary: #f1f5f9;
--text-primary: #1e293b;
--text-secondary: #64748b;
--accent-color: #3b82f6;
--accent-hover: #2563eb;
--border-color: #e2e8f0;
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@supports (font-variation-settings: normal) {
:root { font-family: 'InterVariable', sans-serif; }
}

html, body {
background: var(--bg-primary);
color: var(--text-primary);
line-height: 1.6;
overflow: hidden;
}

.mcp-ui-container {
padding: 1rem;
}

.deck{
  display: grid;
  gap: 1rem;
}

.slide {
aspect-ratio: 16/9;
background: var(--bg-secondary);
padding: 1rem;
}

</style>
`;
    return (
        addFontToHead +
        styles +
        html +
        postMessageUISizeChange +
        listenForMessageFromParent
    );
}
