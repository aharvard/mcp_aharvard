import { WeatherData } from "../types";

export default function WeatherCard(data: WeatherData | null) {
    // Handle null or undefined data
    if (!data) {
        return `
            <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                <p>No weather data available</p>
            </div>
        `;
    }
    const style = `
<style>
  * {
    box-sizing: border-box;
  }
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
  }
  @supports (font-variation-settings: normal) {
    :root { font-family: InterVariable, sans-serif; }
  }
  html, body {
   overflow: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: transparent;
    display: grid;
    --card-background-color: #000000;
    --card-text-color: #ffffff;
  }
  .weather-card {
    margin: 10px;
    background-color: var(--card-background-color);
    width: 100%;
    max-width: 700px;
    color: var(--card-text-color);
    padding: 30px 30px 40px 30px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .15);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    grid-template-areas:
      "location temperature"
      "condition-container temperature "
  }
  .weather-card * {
    margin: 0;
    line-height: 1;
  }
  .location {
    font-size: 48px;
    font-weight: 700;
    grid-area: location;
  }
  .temperature {
    grid-area: temperature;
    display: flex;
    align-items: top;
    justify-content: flex-end;
  }
  .temperature-value {
    font-weight: 900;
    font-size: 160px;
    line-height: 0.8;
    transform: translateY(10px);
    filter: drop-shadow(0 2px 1px rgba(120, 120, 120, 0.25));
  }
  .temperature-unit {
    font-size: 30px;
    margin-top: 8px;
  }
  .weather-condition-container{
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    gap: 6px;
    grid-area: condition-container;
  }
  .condition {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .wind-speed,
  .humidity {
    font-size: 14px;
    font-weight: 2500;
    letter-spacing: 0.05em;
    opacity: 0.75;  
  }
  
  /* Clear and Sunny Conditions */
  .weather-condition-clear-sky {
    background: linear-gradient(135deg, #1e90ff 0%, #00bfff 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-mainly-clear {
    background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 50%, #f0f8ff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-partly-cloudy {
    background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 50%, #f0f8ff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-overcast {
    background: linear-gradient(135deg, #708090 0%, #778899 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }

  /* Fog Conditions */
  .weather-condition-fog {
    background: linear-gradient(135deg, #d3d3d3 0%, #e6e6e6 50%, #f5f5f5 100%);
    --card-text-color: #000000;
  }
  .weather-condition-depositing-rime-fog {
    background: linear-gradient(135deg, #d3d3d3 0%, #e6e6e6 50%, #f5f5f5 100%);
    --card-text-color: #000000;
  }

  /* Drizzle Conditions */
  .weather-condition-light-drizzle {
    background: linear-gradient(135deg, #5f9ea0 0%, #7fb3d3 50%, #b0e0e6 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-moderate-drizzle {
    background: linear-gradient(135deg, #5f9ea0 0%, #7fb3d3 50%, #b0e0e6 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-dense-drizzle {
    background: linear-gradient(135deg, #5f9ea0 0%, #7fb3d3 50%, #b0e0e6 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-light-freezing-drizzle {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-dense-freezing-drizzle {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }

  /* Rain Conditions */
  .weather-condition-slight-rain {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-moderate-rain {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-heavy-rain {
    background: linear-gradient(135deg, #191970 0%, #4169e1 50%, #1e90ff 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-light-freezing-rain {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-heavy-freezing-rain {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }

  /* Snow Conditions */
  .weather-condition-slight-snow {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-moderate-snow {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-heavy-snow {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-snow-grains {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }

  /* Rain Showers */
  .weather-condition-slight-rain-showers {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-moderate-rain-showers {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-violent-rain-showers {
    background: linear-gradient(135deg, #191970 0%, #4169e1 50%, #1e90ff 100%);
    --card-text-color: #ffffff;
  }

  /* Snow Showers */
  .weather-condition-slight-snow-showers {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-heavy-snow-showers {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }

  /* Thunderstorm Conditions */
  .weather-condition-slight-thunderstorm {
    background: linear-gradient(135deg, #2f2f2f 0%, #4b0082 50%, #8a2be2 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-thunderstorm-with-slight-hail {
    background: linear-gradient(135deg, #483d8b 0%, #6a5acd 50%, #9370db 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-thunderstorm-with-heavy-hail {
    background: linear-gradient(135deg, #483d8b 0%, #6a5acd 50%, #9370db 100%);
    --card-text-color: #ffffff;
  } 
</style>
  `;

    const html = `
<div class="weather-card weather-condition-${data.condition
        .toLowerCase()
        .replace(" ", "-")}">
  <p class="location">${data.location}</p>
  <p class="temperature">
    <span class="temperature-value">${data.temperature}</span>
    <span class="temperature-unit">${data.unit}</span>
  </p>
  <div class="weather-condition-container">
    <p class="condition">${data.condition}</p>
    <p class="wind-speed">
      <span class="wind-speed-value">${data.windSpeed}</span>
      <span class="wind-speed-unit">${data.windUnit}</span>
      <span class="wind-speed-label">Winds</span>
    </p>
    <p class="humidity">
    <span class="humidity-value">${data.humidity}%</span>
    <span class="humidity-label">Humidity</span>
    </p>
  </div>
</div>
  `;

    // inform MCP host of UI height
    const postMessageHeight = `
<script>
  // Function to post height to parent
  function postHeight() {
    window.parent.postMessage({ 
      type: 'size-change', 
      payload: {         
        height: document.documentElement.scrollHeight + 'px'
      } 
    }, '*');
  }

  // Post height immediately
  postHeight();

  // Post height after a short delay to ensure content is loaded
  setTimeout(postHeight, 100);

  // Create ResizeObserver to watch for size changes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Post height whenever document size changes
      postHeight();
    }
  });

  // Start observing the document element
  resizeObserver.observe(document.documentElement);

  // Also observe the body element for additional coverage
  resizeObserver.observe(document.body);

  // Post height when window loads
  window.addEventListener('load', postHeight);

  // Post height when DOM content is loaded
  document.addEventListener('DOMContentLoaded', postHeight);
</script>
  `;

    const addFontToHead = `
<script>
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://rsms.me/';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = 'https://rsms.me/inter/inter.css';
  document.head.appendChild(link2);
</script>
    `;

    const htmlString = style + html + postMessageHeight + addFontToHead;

    return htmlString;
}
