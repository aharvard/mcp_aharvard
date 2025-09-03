// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>
const defaultTheme = 'dark';
const defaultHost = 'unknown';
document.documentElement.setAttribute('data-theme', defaultTheme);
document.documentElement.setAttribute('data-host', defaultHost);

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ui-lifecycle-iframe-render-data') {
    console.log('[MCP-UI-HOST] ui-lifecycle-iframe-render-data');
    console.log('Full event:', event);
    const {renderData} = event.data.payload;
    if (renderData) {
      console.log('Payload renderData exists, processing...');
      const theme = renderData.theme || defaultTheme;
      const host = renderData.host || defaultHost;
      
      console.log('Setting theme:', theme, 'host:', host);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-host', host);
      console.log('Document element after setting attributes:', document.documentElement);
    } else {
      console.error('renderData is falsy');
    }
  }
});
window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');
</script>`;
