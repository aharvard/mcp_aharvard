// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>

// Default values
const defaultTheme = 'dark';
const defaultHost = 'unknown';

// Set initial theme and host
document.documentElement.setAttribute('data-theme', defaultTheme);
document.documentElement.setAttribute('data-host', defaultHost);

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ui-lifecycle-iframe-render-data') {
    console.log('[MCP-UI-HOST] ui-lifecycle-iframe-render-data', event.data.payload);
    
    const payload = event.data.payload;
    if (payload) {
      const theme = payload.theme || defaultTheme;
      const host = payload.host || defaultHost;
      
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-host', host);
    }
  }
});

window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');

</script>`;
