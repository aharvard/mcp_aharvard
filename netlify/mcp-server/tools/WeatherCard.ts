import { WeatherData } from "../types";

export default function WeatherCard(data: WeatherData) {
    const style = `
<style>
  body {
    background-color: #000000;
    padding: 10px;
    --card-background-color: #000000;
    --card-text-color: #ffffff;
  }
  .weather-card {
    background-color: var(--card-background-color);
    color: var(--card-text-color);
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .weather-condition-sunny {
    --card-background-color: #00ff00;
    --card-text-color: #000000;
  }
  .weather-condition-partly-cloudy {
    --card-background-color: #ffa500;
    --card-text-color: #000000;
  }
  .weather-condition-cloudy { 
    --card-background-color: #808080;
    --card-text-color: #ffffff;
  }
  .weather-condition-light-rain {
    --card-background-color: #0000ff;
    --card-text-color: #ffffff;
  }
  .weather-condition-heavy-rain {
    --card-background-color: #000080;
    --card-text-color: #ffffff;
  }
  .weather-condition-thunderstorm {
    --card-background-color: #800080;
    --card-text-color: #ffffff;
  }
  .weather-condition-snow {
    --card-background-color: #ffffff;
    --card-text-color: #000000;
  }
  .weather-condition-foggy {
    --card-background-color: #808080;
    --card-text-color: #ffffff;
  }
  .weather-condition-windy {
    --card-background-color: #0000ff;
    --card-text-color: #ffffff;
  }
  .weather-condition-clear {  
    --card-background-color: #0000ff;
    --card-text-color: #ffffff;
  }
  .weather-condition-overcast {
    --card-background-color: #808080;
    --card-text-color: #ffffff;
  }
  .weather-condition-drizzle {
    --card-background-color: #0000ff;
    --card-text-color: #ffffff;
  }
  .weather-condition-hail {
    --card-background-color: #800080;
    --card-text-color: #ffffff;
  }
  .weather-condition-sleet {
    --card-background-color: #0000ff;
    --card-text-color: #ffffff;
  } 
</style>
  `;

    const html = `
<div class="weather-card weather-condition-${data.condition
        .toLowerCase()
        .replace(" ", "-")}">
  <h1>Weather</h1>
  <p>Location: ${data.location}</p>
  <p>Temperature: ${data.temperature} ${data.unit}</p>
  <p>Condition: ${data.condition}</p>
  <p>Humidity: ${data.humidity}%</p>
  <p>Wind Speed: ${data.windSpeed} ${data.windUnit}</p>
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

    const htmlString = style + html + postMessageHeight;

    return htmlString;
}
