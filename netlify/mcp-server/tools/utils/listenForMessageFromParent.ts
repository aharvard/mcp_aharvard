// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>
const defaultTheme = 'dark';
const defaultHost = 'unknown';
document.documentElement.setAttribute('data-theme', defaultTheme);
document.documentElement.setAttribute('data-host', defaultHost);

// Generate messageId for render data request
const renderDataRequestId = crypto.randomUUID();

// Request render data from host on load
window.parent.postMessage({
  type: 'ui-request-render-data',
  messageId: renderDataRequestId,
}, '*');
console.log('⚾️ [MCP-UI] Requesting render data with messageId:', renderDataRequestId);

window.addEventListener('message', (event) => {
  // Log all incoming messages with full data
  console.log('⚾️ [MCP-UI] Incoming message:', event.data);
  
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

  // Handle render data response
  if (event.data && event.data.type === 'ui-message-response' && event.data.messageId === renderDataRequestId) {
    console.log('⚾️ [MCP-UI] Received render data response');
    
    if (event.data.payload && event.data.payload.response) {
      const renderData = event.data.payload.response;
      console.log('⚾️ [MCP-UI] RenderData:', renderData);
      
      const theme = renderData.theme || defaultTheme;
      const host = renderData.host || defaultHost;
      
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-host', host);
    } else if (event.data.payload && event.data.payload.error) {
      console.error('⚾️ [MCP-UI] Error receiving render data:', event.data.payload.error);
    } else {
      console.warn('⚾️ [MCP-UI] Render data response missing payload');
    }
  }
});


</script>`;
