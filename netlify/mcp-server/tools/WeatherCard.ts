import { WeatherData } from "../types";

export default function WeatherCard(data: WeatherData) {
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
    place-items: center;
    --card-background-color: #000000;
    --card-text-color: #ffffff;
  }
  .weather-card {
    margin: 10px;
    background-color: var(--card-background-color);
    width: 100%;
    max-width: 500px;
    color: var(--card-text-color);
    padding: 30px;
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
    font-size: 24px;
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
    font-size: 90px;
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
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .wind-speed,
  .humidity {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.05em;
  }
  
  .weather-condition-sunny {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffb347 100%);
    --card-text-color: #000000;
  }
  .weather-condition-partly-cloudy {
    background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 50%, #f0f8ff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-cloudy { 
    background: linear-gradient(135deg, #696969 0%, #a9a9a9 50%, #d3d3d3 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-light-rain {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-heavy-rain {
    background: linear-gradient(135deg, #191970 0%, #4169e1 50%, #1e90ff 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-thunderstorm {
    background: linear-gradient(135deg, #2f2f2f 0%, #4b0082 50%, #8a2be2 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-snow {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6e6fa 50%, #ffffff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-foggy {
    background: linear-gradient(135deg, #d3d3d3 0%, #e6e6e6 50%, #f5f5f5 100%);
    --card-text-color: #000000;
  }
  .weather-condition-windy {
    background: linear-gradient(135deg, #87ceeb 0%, #b0c4de 50%, #e0f6ff 100%);
    --card-text-color: #000000;
  }
  .weather-condition-clear {  
    background: linear-gradient(135deg, #1e90ff 0%, #00bfff 50%, #87ceeb 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-overcast {
    background: linear-gradient(135deg, #708090 0%, #778899 50%, #b0c4de 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-drizzle {
    background: linear-gradient(135deg, #5f9ea0 0%, #7fb3d3 50%, #b0e0e6 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-hail {
    background: linear-gradient(135deg, #483d8b 0%, #6a5acd 50%, #9370db 100%);
    --card-text-color: #ffffff;
  }
  .weather-condition-sleet {
    background: linear-gradient(135deg, #4682b4 0%, #5f9ea0 50%, #b0c4de 100%);
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
  window.parent.postMessage({ 
    type: 'size-change', 
    payload: {         
      height: document.documentElement.scrollHeight + 'px'
    } 
  }, '*')
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
