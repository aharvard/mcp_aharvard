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
    console.log('[MCP-UI-HOST] ui-lifecycle-iframe-render-data');
    console.log('Full event.data:', event.data);
    console.log('Payload:', event.data.payload);
    
    const payload = event.data.payload;
    if (payload) {
      console.log('Payload exists, processing...');
      const theme = payload.theme || defaultTheme;
      const host = payload.host || defaultHost;
      
      console.log('Setting theme:', theme, 'host:', host);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-host', host);
      console.log('Document element after setting attributes:', document.documentElement);
    } else {
      console.log('Payload is falsy:', payload);
    }
  }
});

window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');

</script>`;
