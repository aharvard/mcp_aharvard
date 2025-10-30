// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>
const defaultTheme = 'dark';
const defaultHost = 'unknown';
document.documentElement.setAttribute('data-theme', defaultTheme);
document.documentElement.setAttribute('data-host', defaultHost);

window.addEventListener('message', (event) => {
  // Log all incoming messages with full data
  console.log('⚾️[MCP-UI] Incoming message:', event);
  
  // Update the incoming message inspector panel
  const incomingMessageContent = document.getElementById('incoming-message-content');
  if (incomingMessageContent && event.data) {
    const timestamp = new Date().toISOString();
    const eventDataJson = JSON.stringify(event.data, null, 2);
    const eventType = event.data.type || 'N/A';
    const eventOrigin = event.origin || 'unknown';
    
    incomingMessageContent.innerHTML = 
      '<div class="message-info">' +
        '<h4>Response from Host:</h4>' +
        '<pre class="message-payload">' + eventDataJson + '</pre>' +
      '</div>';
  }

  if (event.data && event.data.type === 'ui-lifecycle-iframe-render-data') {
    
    const {renderData} = event.data.payload;
    if (renderData) {
      console.log('⚾️[MCP-UI] RenderData:', renderData);
      const theme = renderData.theme || defaultTheme;
      const host = renderData.host || defaultHost;
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-host', host);
    } else {
      console.error('renderData is falsy');
    }
  }
});
</script>`;
