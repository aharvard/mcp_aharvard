# MCP with Express + React

A starter example for using Express with Netlify to add serverless MCP to your React project.

## Features

-   **React 18** with TypeScript
-   **Vite** for fast development and building
-   **Express** serverless functions on Netlify
-   **Model Context Protocol (MCP)** integration
-   **Tailwind CSS** for styling

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

Build the React app to the `public` folder:

```bash
pnpm build
```

The built files will be in the `public` directory, ready for deployment.

## MCP Integration

This project includes MCP (Model Context Protocol) integration through Express serverless functions.

### Using as a Goose Extension

1. Add a custom extension
1. Give it a name
1. Select `HTTP` type
1. Add a description
1. Add this endpoint: https://mcp-aharvard.netlify.app/mcp
1. A timeout of `300` is fine
1. Save changes
1. Ask goose what's the weather in your city (not all cities are supported)

### Using the MCP Inspector

Test the MCP server locally or remotely:

```bash
npx @modelcontextprotocol/inspector npx mcp-remote@next https://mcp-example-express.netlify.app/mcp
```

## Project Structure

```
├── src/                    # React source code
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Main App component
│   ├── App.css            # App styles
│   └── index.css          # Global styles
├── public/                # Static files and build output
├── netlify/               # Netlify functions
│   └── functions/         # Serverless functions
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Deployment

This project is configured for deployment on Netlify. The React app builds to the `public` folder, and the Express functions are deployed as Netlify Functions.

## Learn More

-   [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
-   [Express](https://expressjs.com/)
-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Netlify Functions](https://docs.netlify.com/functions/overview/)
