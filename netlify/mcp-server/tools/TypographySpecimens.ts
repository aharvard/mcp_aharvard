import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";
import { listenForMessageFromParent } from "./utils/listenForMessageFromParent";

interface TypographyParams {
    fontSize?: string;
    showPangrams?: boolean;
}

export default function TypographySpecimens(params?: TypographyParams) {
    const fontSize = params?.fontSize || "medium";
    const showPangrams = params?.showPangrams !== false;

    const fonts = [
        {
            name: "Inter",
            category: "Sans-Serif",
            description: "Modern, versatile sans-serif for UI and body text",
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap",
            weights: [300, 400, 500, 600, 700, 900],
            color: "#2563eb", // blue
        },
        {
            name: "Playfair Display",
            category: "Serif",
            description: "Elegant high-contrast serif for headings",
            url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
            weights: [400, 500, 600, 700, 800, 900],
            color: "#dc2626", // red
        },
        {
            name: "JetBrains Mono",
            category: "Monospace",
            description: "Developer-friendly monospace with ligatures",
            url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap",
            weights: [300, 400, 500, 600, 700, 800],
            color: "#16a34a", // green
        },
        {
            name: "Outfit",
            category: "Display",
            description: "Geometric sans-serif with rounded terminals",
            url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",
            weights: [300, 400, 500, 600, 700, 800, 900],
            color: "#9333ea", // purple
        },
    ];

    const sampleText =
        "The quick brown fox jumps over the lazy dog. PACK MY BOX WITH FIVE DOZEN LIQUOR JUGS.";
    const loremText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const numberText = "0123456789 $€£¥ #@&!?";

    const fontLinks = fonts
        .map((font) => `<link href="${font.url}" rel="stylesheet">`)
        .join("\n");

    const fontSpecimens = fonts
        .map(
            (font) => `
    <div class="specimen-card">
      <div class="specimen-header">
        <h2 class="font-name" style="font-family: '${
            font.name
        }', sans-serif;">${font.name}</h2>
        <span class="font-category">${font.category}</span>
      </div>
      <p class="font-description">${font.description}</p>
      
      <div class="specimen-section">
        <h3 class="section-title">Display</h3>
        <p class="display-text ${fontSize}" style="font-family: '${
                font.name
            }', sans-serif; font-weight: 700;">
          Typography Matters
        </p>
      </div>

      ${
          showPangrams
              ? `
      <div class="specimen-section">
        <h3 class="section-title">Pangram & Numbers</h3>
        <p class="sample-text ${fontSize}" style="font-family: '${font.name}', sans-serif;">
          ${sampleText}
        </p>
        <p class="number-text" style="font-family: '${font.name}', sans-serif;">
          ${numberText}
        </p>
      </div>
      `
              : ""
      }

      <div class="specimen-section">
        <h3 class="section-title">Paragraph</h3>
        <p class="paragraph-text ${fontSize}" style="font-family: '${
                font.name
            }', sans-serif;">
          ${loremText}
        </p>
      </div>

      <div class="specimen-section">
        <h3 class="section-title">Weight Scale</h3>
        <div class="weight-grid">
          ${font.weights
              .map(
                  (weight) => `
            <div class="weight-sample">
              <span class="weight-label">${weight}</span>
              <span class="weight-text ${fontSize}" style="font-family: '${font.name}', sans-serif; font-weight: ${weight};">
                Aa Bb Cc 123
              </span>
            </div>
          `
              )
              .join("")}
        </div>
      </div>
    </div>
  `
        )
        .join("");

    const styles = `
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Arial', sans-serif;
  }
  
  /* Dark theme (default) */
  :root,
  [data-theme="dark"] {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --text-primary: #ddd;
    --text-secondary: #a0a0a0;
    --border-color: #333333;
    --border-heavy: #666666;
  }
  
  /* Light theme */
  [data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --text-primary: #000000;
    --text-secondary: #666666;
    --border-color: #000000;
    --border-heavy: #000000;
  }
  
  html, body {
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.4;
  }
  
  body {
    overflow-x: hidden;
  }
  
  .mcp-ui-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .page-header {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 3px solid var(--border-heavy);
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  
  .page-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .specimens-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .specimen-card {
    background: var(--bg-secondary);
    border: 2px solid var(--border-heavy);
    padding: 1.5rem;
  }
  
  .specimen-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    gap: 1rem;
  }
  
  .font-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }
  
  .font-category {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .font-description {
    display: none;
  }
  
  .specimen-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .specimen-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .section-title {
    font-size: 0.625rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }
  
  .display-text {
    color: var(--text-primary);
    line-height: 1.1;
    font-weight: 700;
  }
  
  .display-text.small {
    font-size: 2.5rem;
  }
  
  .display-text.medium {
    font-size: 3.5rem;
  }
  
  .display-text.large {
    font-size: 4.5rem;
  }
  
  .sample-text {
    color: var(--text-primary);
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }
  
  .sample-text.small {
    font-size: 0.75rem;
  }
  
  .sample-text.medium {
    font-size: 0.875rem;
  }
  
  .sample-text.large {
    font-size: 1rem;
  }
  
  .number-text {
    color: var(--text-primary);
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
  }
  
  .paragraph-text {
    color: var(--text-primary);
    line-height: 1.5;
  }
  
  .paragraph-text.small {
    font-size: 0.75rem;
  }
  
  .paragraph-text.medium {
    font-size: 0.875rem;
  }
  
  .paragraph-text.large {
    font-size: 1rem;
  }
  
  .weight-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  
  .weight-sample {
    border: 1px solid var(--border-color);
    padding: 0.75rem;
  }
  
  .weight-label {
    font-size: 0.625rem;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .weight-text {
    color: var(--text-primary);
    display: block;
  }
  
  .weight-text.small {
    font-size: 1.25rem;
  }
  
  .weight-text.medium {
    font-size: 1.5rem;
  }
  
  .weight-text.large {
    font-size: 1.75rem;
  }
  
  @media (max-width: 900px) {
    .specimens-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .mcp-ui-container {
      padding: 0.75rem;
    }
    
    .page-title {
      font-size: 1.75rem;
    }
    
    .page-subtitle {
      font-size: 0.75rem;
    }
    
    .specimen-card {
      padding: 1rem;
    }
    
    .font-name {
      font-size: 1.25rem;
    }
    
    .display-text.small {
      font-size: 1.5rem;
    }
    
    .display-text.medium {
      font-size: 2rem;
    }
    
    .display-text.large {
      font-size: 2.5rem;
    }
    
    .weight-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
  }
</style>
  `;

    const html = `
<article class="mcp-ui-container">
  <div class="page-header">
    <h1 class="page-title">Typography Specimens</h1>
    <p class="page-subtitle">Explore beautiful open-source typefaces</p>
  </div>
  
  <div class="specimens-grid">
    ${fontSpecimens}
  </div>
</article>
  `;

    return (
        fontLinks +
        styles +
        html +
        postMessageUISizeChange({ aggressive: false }) +
        listenForMessageFromParent
    );
}
