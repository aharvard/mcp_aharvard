import { createUIResource } from "@mcp-ui/server";
import { WeatherData } from "../types";

export default function WeatherCard(data: WeatherData) {
    const style = `
<style>
  body {
    background-color: #f0f0f0;
    padding: 10px;
  }
  .weather-card {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
</style>
  `;

    const html = `
<div class="weather-card">
  <h1>Weather</h1>
  <p>Location: ${data.location}</p>
  <p>Temperature: ${data.temperature} ${data.unit}</p>
  <p>Condition: ${data.condition}</p>
  <p>Humidity: ${data.humidity}%</p>
  <p>Wind Speed: ${data.windSpeed} ${data.windUnit}</p>
</div>
  `;

    const uiResource = createUIResource({
        uri: "ui://mcp-aharvard/weather-card",
        content: {
            type: "rawHtml",
            htmlString: style + html,
        },
        encoding: "text",
    });

    return {
        ...uiResource,
        annotations: {
            audience: ["user"],
        },
    };
}
