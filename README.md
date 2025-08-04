# MCP-UI Demos

A visualization sandbox for testing MCP-UI components and interactions in a convenient environment. This project demonstrates how to build MCP-UI enabled applications using Express with Netlify serverless functions.

## Features

-   **React 18** with TypeScript
-   **Next.js** for fast development and building
-   **Express** serverless functions on Netlify
-   **MCP-UI** integration for rich UI components
-   **Tailwind CSS** for styling
-   **Interactive demos** for weather, seat selection, and UI actions

## What is this Sandbox?

This is a **visualization sandbox** for testing MCP-UI components and interactions. It provides a convenient environment to:

-   Test UI components that can be rendered by MCP-UI clients
-   Simulate tool calls and user interactions
-   Debug message passing between MCP servers and UI clients
-   Prototype new UI patterns for MCP applications

The sandbox runs on **Netlify serverless functions**, making it easy to deploy and share with others without managing infrastructure.

## Development

### Prerequisites

-   Node.js 18+
-   pnpm (recommended) or npm

### Setup

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Start the development server:

    ```bash
    pnpm dev
    ```

3. Open your browser to `http://localhost:3000`

### Building for Production

Build the React app:

```bash
pnpm build
```

The built files will be ready for deployment on Netlify.

## Available Demos

### Weather Demo (`/get-weather`)

Test the weather tool with real API calls to Open-Meteo. Demonstrates how to integrate external APIs with MCP-UI components.

### Seat Selection (`/pick-seat`)

Interactive seat picker with visual feedback. Shows how to create complex interactive UI components that can be embedded in MCP clients.

### UI Actions (`/ui-actions`)

Test different types of MCP-UI message actions including tool calls, prompts, links, intents, and notifications.

### Toast Notifications (`/toast-demo`)

Demonstrate toast notification patterns for user feedback in MCP-UI applications.

## MCP Integration

This project includes MCP (Model Context Protocol) integration through Express serverless functions, specifically designed for MCP-UI components.

### Using as a Goose Extension

1. Add a custom extension
1. Give it a name
1. Select `HTTP` type
1. Add a description
1. Add this endpoint: https://mcp-aharvard.netlify.app/mcp
1. A timeout of `300` is fine
1. Save changes
1. Ask goose what's the weather in your city (not all cities are supported)

### Available Tool Calls

#### getWeather

Fetches real-time weather data from Open-Meteo API

-   **Parameters:**
    -   `location`: string (city name)
    -   `units`: "metric" | "imperial"

#### SeatSelection

Interactive seat selection interface with visual feedback

-   **Features:**
    -   Visual seat grid
    -   Real-time availability
    -   Selection confirmation

#### UIActionCard

Demonstrates various MCP-UI message types

-   **Message Types:**
    -   tool - Execute specific tools
    -   prompt - Send prompts to AI
    -   link - Open external URLs
    -   intent - Trigger specific intents
    -   notify - Show notifications

### Weather API Information

This project uses the **Open-Meteo API** for weather data, which provides free weather forecasts based on multiple national weather providers. The API uses WMO (World Meteorological Organization) weather interpretation codes to describe weather conditions.

#### Supported Weather Conditions

The weather tool supports all WMO weather codes (0-99), including:

-   **Clear Conditions**: Clear sky, mainly clear, partly cloudy, overcast
-   **Fog Conditions**: Fog, depositing rime fog
-   **Drizzle**: Light, moderate, and dense drizzle (including freezing)
-   **Rain**: Slight, moderate, and heavy rain (including freezing)
-   **Snow**: Slight, moderate, and heavy snow, snow grains
-   **Showers**: Rain and snow showers of various intensities
-   **Thunderstorms**: Slight thunderstorms with and without hail

#### API Features

-   **Free to use** with no API key required
-   **High accuracy** using multiple weather models
-   **Global coverage** with automatic model selection
-   **Real-time data** with hourly updates
-   **Multiple units** support (metric/imperial)

#### Data Sources

The API combines weather models from multiple national weather providers:

-   **ICON** (Germany) - 2-11 km resolution
-   **GFS & HRRR** (NOAA, US) - 3-25 km resolution
-   **ARPEGE & AROME** (Météo-France) - 1-25 km resolution
-   **IFS & AIFS** (ECMWF, EU) - 25 km resolution
-   And many more regional models

For more information, visit: [Open-Meteo API Documentation](https://open-meteo.com/en/docs)

### Using the MCP Inspector

Test the MCP server locally or remotely:

```bash
npx @modelcontextprotocol/inspector --config mcp-config.json --server mcp-aharvard
```

## Project Structure

```
├── app/                   # Next.js app directory
│   ├── page.tsx          # Main landing page
│   ├── get-weather/      # Weather demo
│   ├── pick-seat/        # Seat selection demo
│   ├── ui-actions/       # UI actions demo
│   └── toast-demo/       # Toast notifications demo
├── components/            # React components
├── netlify/              # Netlify functions
│   ├── functions/        # Serverless functions
│   └── mcp-server/       # MCP server implementation
│       └── tools/        # MCP tool implementations
├── mcp-config.json       # MCP configuration
└── package.json          # Dependencies and scripts
```

## Netlify Serverless Architecture

### How it Works

-   **Serverless Functions**: The MCP server runs as a Netlify Function at `/mcp` endpoint
-   **Express Integration**: Uses Express.js wrapped with `serverless-http` for HTTP request handling
-   **Stateless Design**: Each request creates a new MCP server instance to ensure complete isolation between concurrent clients
-   **Streaming Transport**: Uses `StreamableHTTPServerTransport` for real-time communication

### File Structure

```
netlify/
├── functions/
│   └── express-mcp-server.ts
└── mcp-server/
    ├── index.ts
    ├── types.ts
    └── tools/
        ├── getWeather.ts
        ├── SeatSelection.ts
        ├── UIActionCard.ts
        └── WeatherCard.ts
```

## Deployment

This project is configured for deployment on Netlify. The Next.js app builds automatically, and the Express functions are deployed as Netlify Functions.

## Learn More

-   [MCP-UI Documentation](https://github.com/idosal/mcp-ui)
-   [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
-   [Express](https://expressjs.com/)
-   [Next.js](https://nextjs.org/)
-   [Netlify Functions](https://docs.netlify.com/functions/overview/)
