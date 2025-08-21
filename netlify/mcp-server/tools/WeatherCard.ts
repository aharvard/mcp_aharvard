import { WeatherData } from "../types";
import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";
import { addFontToHead } from "./utils/addFontToHead";

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
    --card-background-color: #000000;
    --card-text-color: #ffffff;
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
  }
  .mcp-ui-container{
    // max-width: 700px; 
    container-type: inline-size;
    container-name: weather-card;
  }
 
  .weather-card {
    margin: 10px;
    position: relative;
    color: var(--card-text-color);
    padding: 30px 30px 40px 30px;
    border-radius: 4px;
    box-shadow: 0 0 0 10px rgba(255, 255, 255, .15);
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    overflow: hidden;
    grid-template-areas:
      "location"
      "temperature"
      "condition-container "
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
    margin-bottom: 15px;
  }
  .temperature-value {
    font-weight: 900;
    font-size: 30cqw;
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
  
    /* Rotating gradient animation using pseudo-element */
  @keyframes rotateGradient {
    0% {
      transform: rotate(-60deg);
      scale: 1;
    }
    100% {
      transform: rotate(0deg);
      scale: 1.5;
    }
  }
  
  /* Pseudo-element for animated gradient background */
  .weather-card::before {
    content: '';
    position: absolute;
    --size: 200%;
    top: -50cqw;
    left: calc(50% - var(--size) / 2);
    width: var(--size);
    aspect-ratio: 1/1;
    transform-origin: center;
    z-index: -1;
    background: linear-gradient(135deg, var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-3));
    animation: rotateGradient 3s ease-in-out infinite alternate;
  }
  
  /* Clear and Sunny Conditions */
  .weather-condition-clear-sky {
    --gradient-color-1: #1e90ff;
    --gradient-color-2: #00bfff;
    --gradient-color-3: #87ceeb;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-mainly-clear {
    --gradient-color-1: #87ceeb;
    --gradient-color-2: #b0e0e6;
    --gradient-color-3: #f0f8ff;
    --card-text-color: #1a3c4a;
  }
  .weather-condition-partly-cloudy {
    --gradient-color-1: #87ceeb;
    --gradient-color-2: #b0e0e6;
    --gradient-color-3: #f0f8ff;
    --card-text-color: #1a3c4a;
  }
  .weather-condition-overcast {
    --gradient-color-1: #708090;
    --gradient-color-2: #778899;
    --gradient-color-3: #b0c4de;
    --card-text-color: #e8f0f8;
  }

  /* Fog Conditions */
  .weather-condition-fog {
    --gradient-color-1: #d3d3d3;
    --gradient-color-2: #e6e6e6;
    --gradient-color-3: #f5f5f5;
    --card-text-color: #2d2d2d;
  }
  .weather-condition-depositing-rime-fog {
    --gradient-color-1: #d3d3d3;
    --gradient-color-2: #e6e6e6;
    --gradient-color-3: #f5f5f5;
    --card-text-color: #2d2d2d;
  }

  /* Drizzle Conditions */
  .weather-condition-light-drizzle {
    --gradient-color-1: #5f9ea0;
    --gradient-color-2: #7fb3d3;
    --gradient-color-3: #b0e0e6;
    --card-text-color: #e6f7ff;
  }
  .weather-condition-moderate-drizzle {
    --gradient-color-1: #5f9ea0;
    --gradient-color-2: #7fb3d3;
    --gradient-color-3: #b0e0e6;
    --card-text-color: #e6f7ff;
  }
  .weather-condition-dense-drizzle {
    --gradient-color-1: #5f9ea0;
    --gradient-color-2: #7fb3d3;
    --gradient-color-3: #b0e0e6;
    --card-text-color: #e6f7ff;
  }
  .weather-condition-light-freezing-drizzle {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #b0c4de;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-dense-freezing-drizzle {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #b0c4de;
    --card-text-color: #e6f3ff;
  }

  /* Rain Conditions */
  .weather-condition-slight-rain {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #87ceeb;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-moderate-rain {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #87ceeb;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-heavy-rain {
    --gradient-color-1: #191970;
    --gradient-color-2: #4169e1;
    --gradient-color-3: #1e90ff;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-light-freezing-rain {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #b0c4de;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-heavy-freezing-rain {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #b0c4de;
    --card-text-color: #e6f3ff;
  }

  /* Snow Conditions */
  .weather-condition-slight-snow {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }
  .weather-condition-moderate-snow {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }
  .weather-condition-heavy-snow {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }
  .weather-condition-snow-grains {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }

  /* Rain Showers */
  .weather-condition-slight-rain-showers {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #87ceeb;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-moderate-rain-showers {
    --gradient-color-1: #4682b4;
    --gradient-color-2: #5f9ea0;
    --gradient-color-3: #87ceeb;
    --card-text-color: #e6f3ff;
  }
  .weather-condition-violent-rain-showers {
    --gradient-color-1: #191970;
    --gradient-color-2: #4169e1;
    --gradient-color-3: #1e90ff;
    --card-text-color: #e6f3ff;
  }

  /* Snow Showers */
  .weather-condition-slight-snow-showers {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }
  .weather-condition-heavy-snow-showers {
    --gradient-color-1: #f0f8ff;
    --gradient-color-2: #e6e6fa;
    --gradient-color-3: #ffffff;
    --card-text-color: #1a1a2e;
  }

  /* Thunderstorm Conditions */
  .weather-condition-slight-thunderstorm {
    --gradient-color-1: #2f2f2f;
    --gradient-color-2: #4b0082;
    --gradient-color-3: #8a2be2;
    --card-text-color: #f0e6ff;
  }
  .weather-condition-thunderstorm-with-slight-hail {
    --gradient-color-1: #483d8b;
    --gradient-color-2: #6a5acd;
    --gradient-color-3: #9370db;
    --card-text-color: #f0e6ff;
  }
  .weather-condition-thunderstorm-with-heavy-hail {
    --gradient-color-1: #483d8b;
    --gradient-color-2: #6a5acd;
    --gradient-color-3: #9370db;
    --card-text-color: #f0e6ff;
  } 

   @container weather-card (min-width: 600px) {
    .weather-card {
     grid-template-columns: 1fr auto;
     grid-template-areas:
      "location temperature"
      "condition-container temperature "
    }
    .temperature {
      justify-content: flex-end;
      margin-bottom: 0px;
    }
    .temperature-value {
      font-size: 20cqw;
    }
  }

  
</style>
  `;

    const html = `
<article class="mcp-ui-container">
  <div class="weather-card weather-condition-${data.condition
      .toLowerCase()
      .replace(/ /g, "-")}">
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
</article>
  `;

    const htmlString = style + html + postMessageUISizeChange + addFontToHead;

    return htmlString;
}
