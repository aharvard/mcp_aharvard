import { addFontToHead } from "./utils/addFontToHead";
import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";
import { listenForMessageFromParent } from "./utils/listenForMessageFromParent";

export default function UIActionCard() {
    const Action = (
        actionObject: any,
        text: string,
        description: string,
        icon: string,
        customInputs?: string
    ) => {
        const actionDataJson = JSON.stringify(actionObject).replace(
            /"/g,
            "&quot;"
        );
        return `
<div class="action-row">
  <div class="action-content">
    <div class="action-icon">${icon}</div>
    <div class="action-details">
      <h3 class="action-title">${text}</h3>
      <p class="action-description">${description}</p>
      ${customInputs || ""}
    </div>
  </div>
  <div class="action-buttons">
    <button 
      class="action-button"
      data-action-name="${text}"
      data-action-data="${actionDataJson}"
      onclick="postMessageAndInspect(this)">
      Post Message
    </button>
  </div>
</div>
`;
    };

    const toolAction = {
        type: "tool",
        payload: {
            toolName: "get-weather",
            params: {
                city: "Tokyo",
                units: "metric",
                displayType: "inline",
            },
        },
        messageId: crypto.randomUUID(),
    };

    const promptAction = {
        type: "prompt",
        payload: {
            prompt: "What is the weather in Tokyo?",
        },
        messageId: crypto.randomUUID(),
    };

    const linkAction = {
        type: "link",
        payload: {
            url: "https://www.google.com",
        },
        messageId: crypto.randomUUID(),
    };

    const intentAction = {
        type: "intent",
        payload: {
            intent: "create-task",
            params: {
                title: "Buy groceries",
                description: "Buy groceries for the week",
            },
        },
        messageId: crypto.randomUUID(),
    };

    const notifyAction = {
        type: "notify",
        payload: {
            message: "cart-updated",
        },
        messageId: crypto.randomUUID(),
    };

    // Type assertion for custom action type not yet in @mcp-ui/server
    const requestRenderDataAction = {
        type: "ui-request-render-data",
        messageId: crypto.randomUUID(),
    };

    const iframeReadyAction = {
        type: "ui-lifecycle-iframe-ready",
        messageId: crypto.randomUUID(),
    };

    const sizeChangeAction = {
        type: "ui-size-change",
        payload: {
            height: 600,
            width: 800,
        },
        messageId: crypto.randomUUID(),
    };

    const sizeChangeInputs = `
<div class="input-group">
  <div class="input-row">
    <label for="size-height">Height:</label>
    <input type="number" id="size-height" class="size-input" value="600" min="0" />
  </div>
  <div class="input-row">
    <label for="size-width">Width:</label>
    <input type="number" id="size-width" class="size-input" value="800" min="0" />
  </div>
</div>
`;

    const requestDataAction = {
        type: "ui-request-data",
        messageId: crypto.randomUUID(),
    };

    const html = `
    <article class="mcp-ui-container">
<div class="dark-container">
  <div class="header">
    <h1>MCP-UI Actions</h1>
    <p class="subtitle">Interactive control panel for MCP-UI actions</p>
  </div>
  
  <div class="main-content">
    <div class="actions-panel">
      ${Action(
          sizeChangeAction,
          "UI Size Change",
          "Send ui-size-change message with dimensions",
          "📐",
          sizeChangeInputs
      )}
      ${Action(
          iframeReadyAction,
          "UI Lifecycle Iframe Ready",
          "Send ui-lifecycle-iframe-ready message to host",
          "✅"
      )}
      ${Action(
          requestDataAction,
          "UI Request Data",
          "Send ui-request-data message to host",
          "📥"
      )}
      ${Action(
          requestRenderDataAction,
          "UI Request Render Data",
          "Send ui-request-render-data message to host",
          "📊"
      )}
      ${Action(
          toolAction,
          "Tool Action",
          "Execute a specific tool with parameters",
          "⚙️"
      )}
      ${Action(
          intentAction,
          "Intent Action",
          "Trigger a specific intent handler",
          "🎯"
      )}
      ${Action(
          promptAction,
          "Prompt Action",
          "Send a prompt to the AI system",
          "💬"
      )}
      ${Action(
          notifyAction,
          "Notify Action",
          "Display a notification message",
          "🔔"
      )}
      ${Action(linkAction, "Link Action", "Navigate to an external URL", "🔗")}
      
   
    
    </div>
    
    <div class="inspection-panel" id="inspection-panel">
      <div class="inspection-header">
        <h3>Message Inspector</h3>
      </div>
      <div class="inspection-content" id="inspection-content">
        <div class="placeholder">
          <span class="placeholder-icon">🔍</span>
          <p>Click "Post Message" on any action to see the message payload and response from host</p>
        </div>
      </div>
      <div class="inspection-content" id="incoming-message-content">
        <div class="placeholder">
          <span class="placeholder-icon">📨</span>
          <p>Waiting for messages from host...</p>
        </div>
      </div>
    </div>
  </div>
</div>
</article>

<script>
function postMessageAndInspect(button) {
  const actionName = button.getAttribute('data-action-name');
  const actionData = button.getAttribute('data-action-data');
  
  let messageObject = null;
  
  // Special handling for UI Size Change action - read from inputs
  if (actionName === 'UI Size Change') {
    const heightInput = document.getElementById('size-height');
    const widthInput = document.getElementById('size-width');
    
    if (heightInput && widthInput) {
      const height = parseInt(heightInput.value) || 600;
      const width = parseInt(widthInput.value) || 800;
      
      // Create updated action with input values
      messageObject = {
        type: 'ui-size-change',
        payload: {
          height: height,
          width: width
        },
        messageId: crypto.randomUUID()
      };
    }
  } else if (actionData) {
    // Parse the stored JSON data
    try {
      messageObject = JSON.parse(actionData);
    } catch (error) {
      console.error('[MCP-UI] Error parsing action data:', error);
      return;
    }
  }
  
  if (!messageObject) {
    console.error('[MCP-UI] No message object to send');
    return;
  }
  
  // Show inspection
  const content = document.getElementById('inspection-content');
  const panel = document.getElementById('inspection-panel');
  
  if (content && panel && actionName) {
    const formattedMessage = JSON.stringify(messageObject, null, 2);
    content.innerHTML = '<div class="message-info"><h4>' + actionName + '</h4><pre class="message-payload">' + formattedMessage + '</pre></div>';
    panel.classList.add('active');
  }
  
  // Post message to parent (no eval needed!)
  console.log('⚾️[MCP-UI] Sending message to parent:', {
    actionName: actionName,
    message: messageObject,
    timestamp: new Date().toISOString()
  });
  
  try {
    window.parent.postMessage(messageObject, '*');
    console.log('⚾️[MCP-UI] Message sent successfully');
  } catch (error) {
    console.error('[MCP-UI] Error posting message:', error);
  }
}
</script>
    `;

    const styles = `
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1;
  }
  
  /* Dark theme (default) */
  :root,
  [data-theme="dark"] {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #2a2a2a;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --accent-color: #3b82f6;
    --accent-hover: #60a5fa;
    --border-color: #333333;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  }
  
  /* Light theme */
  [data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --accent-color: #3b82f6;
    --accent-hover: #2563eb;
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  @supports (font-variation-settings: normal) {
    :root { font-family: 'InterVariable', sans-serif; }
  }
  
  html, body {
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow: hidden;
  }
  
  .mcp-ui-container {
   padding: 1rem;
  }

  .dark-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .header h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    font-weight: 400;
  }
  
  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .actions-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.25rem;
    background: var(--bg-tertiary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    gap: 1rem;
  }
  
  .action-row:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-color);
  }
  
  [data-theme="dark"] .action-row:hover {
    background: #323232;
  }
  
  [data-theme="light"] .action-row:hover {
    background: #e2e8f0;
  }
  
  .action-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex: 1;
    min-width: 0;
  }
  
  .action-icon {
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
  
  .action-details {
    flex: 1;
    min-width: 0;
  }
  
  .action-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .action-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  
  .input-group {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  
  .input-row label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .size-input {
    width: 80px;
    padding: 0.375rem 0.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-family: inherit;
  }
  
  .size-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    align-self: flex-start;
  }
  
  .action-button {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
  }
  
  .action-button:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  .action-button:active {
    transform: translateY(0);
  }
  
  .inspection-panel {
    background: var(--bg-tertiary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    padding: 1.5rem;
    height: fit-content;
    position: sticky;
    top: 2rem;
  }
  
  .inspection-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .inspection-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .inspection-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .inspection-divider {
    height: 1px;
    background: var(--border-color);
    margin: 1.5rem 0;
  }
  
  .inspection-content {
    min-height: 200px;
  }
  
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--text-secondary);
    text-align: center;
  }
  
  .placeholder-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .placeholder p {
    font-size: 0.875rem;
  }
  
  .message-info h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .message-info h5 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .message-details {
    margin-bottom: 0.5rem;
  }
  
  .message-details p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .message-details strong {
    color: var(--text-primary);
  }
  
  .message-payload {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.4;
    color: var(--text-secondary);
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  @media (max-width: 1024px) {
    .main-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .inspection-panel {
      position: static;
    }
  }
  
  @media (max-width: 480px) {
    .main-content {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .inspection-panel {
      position: static;
    }
  }
  
  @media (max-width: 640px) {
    .dark-container {
      margin: 0.25rem;
      padding: 0.5rem;
    }
    
    .header h1 {
      font-size: 1.25rem;
      margin-bottom: 0.125rem;
    }
    
    .subtitle {
      font-size: 0.75rem;
    }
    
    .header {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
    }
    
    .main-content {
      gap: 0.5rem;
    }
    
    .actions-panel {
      gap: 0.5rem;
    }
    
    .action-row {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
    }
    
    .action-content {
      flex-direction: row;
      text-align: left;
      gap: 0.5rem;
      flex: 1;
    }
    
    .action-icon {
      font-size: 1rem;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
    
    .action-details {
      flex: 1;
      min-width: 0;
    }
    
    .action-title {
      font-size: 0.875rem;
      margin-bottom: 0.125rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .action-description {
      font-size: 0.625rem;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .input-group {
      margin-top: 0.5rem;
      flex-direction: column;
      gap: 0.375rem;
    }
    
    .input-row {
      gap: 0.375rem;
    }
    
    .input-row label {
      font-size: 0.625rem;
      min-width: 40px;
    }
    
    .size-input {
      width: 60px;
      padding: 0.25rem 0.375rem;
      font-size: 0.625rem;
    }
    
    .action-buttons {
      flex-shrink: 0;
      gap: 0.25rem;
    }
    
    .action-button {
      padding: 0.375rem 0.5rem;
      font-size: 0.625rem;
      border-radius: 4px;
      white-space: nowrap;
      min-width: 3.5rem;
    }
    
    .inspection-panel {
      padding: 0.75rem;
    }
    
    .inspection-header {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
    }
    
    .inspection-header h3 {
      font-size: 0.875rem;
      margin-bottom: 0.125rem;
    }
    
    .inspection-subtitle {
      font-size: 0.625rem;
    }
    
    .inspection-divider {
      margin: 1rem 0;
    }
    
    .inspection-content {
      min-height: 120px;
    }
    
    .placeholder {
      height: 120px;
    }
    
    .placeholder-icon {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }
    
    .placeholder p {
      font-size: 0.625rem;
    }
    
    .message-info h4 {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }
    
    .message-info h5 {
      font-size: 0.625rem;
    }
    
    .message-details p {
      font-size: 0.625rem;
    }
    
    .message-payload {
      font-size: 0.5rem;
      padding: 0.5rem;
      line-height: 1.2;
    }
  }
</style>
    `;
    return (
        addFontToHead +
        styles +
        html +
        postMessageUISizeChange({ aggressive: false }) +
        listenForMessageFromParent
    );
}
