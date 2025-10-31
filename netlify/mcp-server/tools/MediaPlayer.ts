import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";
import { addFontToHead } from "./utils/addFontToHead";

interface MediaPlayerOptions {
    type: "video" | "audio";
    url?: string;
    title?: string;
    artist?: string;
    source?: string;
    license?: string;
}

export default function MediaPlayer(options: MediaPlayerOptions) {
    const { type } = options;

    // Default content based on type
    const defaults =
        type === "video"
            ? {
                  url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  title: "Big Buck Bunny",
                  artist: "Blender Foundation",
                  source: "Blender Open Movie Project",
                  license: "Creative Commons Attribution 3.0",
              }
            : {
                  url: "https://archive.org/download/aaron-copland-new-york-philharmonic-leonard-bernstein-appalachian-spring-o-rodeo/Bernstein%20Century%20-%20Copland_%20Appalachian/21%20Copland_%20Fanfare%20For%20The%20Common%20M.mp3",
                  title: "Fanfare For The Common Man",
                  artist: "Aaron Copland, New York Philharmonic, Leonard Bernstein",
                  source: "Internet Archive",
                  license: "Public Domain",
              };

    const {
        url = defaults.url,
        title = defaults.title,
        artist = defaults.artist,
        source = defaults.source,
        license = defaults.license,
    } = options;

    const style = `
<style>
  * {
    box-sizing: border-box;
  }
  
  :root {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1;
  }
  
  @supports (font-variation-settings: normal) {
    :root { font-family: InterVariable, sans-serif; }
  }
  
  html, body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  body {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .mcp-ui-container {
    width: 100%;
    padding: 0;
  }
  
  .media-player-container {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .media-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    animation: slideIn 0.5s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .media-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .media-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 4px;
  }
  
  .media-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    color: #1f2937;
  }
  
  .media-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    color: #6b7280;
  }
  
  .media-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .media-meta-label {
    font-weight: 600;
  }
  
  .player-wrapper {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
  
  video, audio {
    width: 100%;
    display: block;
    outline: none;
  }
  
  video {
    aspect-ratio: 16 / 9;
  }
  
  audio {
    height: 54px;
  }
  
  .media-info {
    padding: 16px;
    background: #f9fafb;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
  }
  
  .info-label {
    font-weight: 600;
    color: #6b7280;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }
  
  .info-value {
    color: #1f2937;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
  }
  
  @media (max-width: 640px) {
    .media-player-container {
      padding: 12px;
    }
    
    .media-content {
      padding: 16px;
      gap: 16px;
    }
    
    .media-title {
      font-size: 20px;
    }
    
    .info-row {
      flex-direction: column;
      gap: 4px;
    }
    
    .info-value {
      text-align: left;
    }
  }
  
  /* Custom focus styles for accessibility */
  video:focus, audio:focus {
    outline: 3px solid #667eea;
    outline-offset: 4px;
  }
</style>
  `;

    const mediaPlayer =
        type === "video"
            ? `
        <div class="player-wrapper">
          <video 
            controls 
            controlsList="nodownload"
            preload="metadata"
            aria-label="${title}"
          >
            <source src="${url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `
            : `
        <div class="player-wrapper">
          <audio 
            controls 
            controlsList="nodownload"
            preload="metadata"
            aria-label="${title}"
          >
            <source src="${url}" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
        </div>
      `;

    const html = `
<article class="mcp-ui-container">
  <div class="media-player-container">
    <div class="media-card">
      <div class="media-content">
        <div class="media-header">
          <h1 class="media-title">${title}</h1>
          <div class="media-meta">
            <div class="media-meta-item">
              <span class="media-meta-label">${
                  type === "video" ? "Created by:" : "Artist:"
              }</span>
              <span>${artist}</span>
            </div>
          </div>
        </div>
        
        ${mediaPlayer}
        
        <div class="media-info">
          <div class="info-row">
            <span class="info-label">Source</span>
            <span class="info-value">${source}</span>
          </div>
          <div class="info-row">
            <span class="info-label">License</span>
            <span class="info-value">${license}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Type</span>
            <span class="info-value">${
                type === "video" ? "Video (MP4)" : "Audio (MP3)"
            }</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>
  `;

    const htmlString =
        style +
        html +
        postMessageUISizeChange({ aggressive: false }) +
        addFontToHead;

    return htmlString;
}
