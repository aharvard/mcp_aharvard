// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>

const iframeRenderData = {
  theme: 'light',
  host: undefined,
};

window.addEventListener('message', (event) => {
  if (event.data.type === 'ui-lifecycle-iframe-render-data') {
    console.log('[MCP-UI-HOST] ui-lifecycle-iframe-render-data', event.data.payload);
    iframeRenderData.theme = event.data.payload.theme;
    iframeRenderData.host = event.data.payload.host;
    
    // Set the theme and host attributes on the document root
    document.documentElement.setAttribute('data-theme', iframeRenderData.theme);
    if (iframeRenderData.host) {
      document.documentElement.setAttribute('data-host', iframeRenderData.host);
    }
  }
});

window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');

// Set initial theme and host
document.documentElement.setAttribute('data-theme', iframeRenderData.theme);
if (iframeRenderData.host) {
  document.documentElement.setAttribute('data-host', iframeRenderData.host);
}

</script>`;
