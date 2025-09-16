// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const mcpUiContainer = document.querySelector('.mcp-ui-container');
  
  function postSize() {
    const height = mcpUiContainer.scrollHeight;
    const width = mcpUiContainer.scrollWidth;
    window.parent.postMessage(
      {
        type: "ui-size-change",
        payload: {
          height: height,
          width: width, 
        },
      },
      "*",
    );
  }

  // Create ResizeObserver to watch for size changes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Post size whenever document size changes
      postSize();
    }
  });

  // Start observing the mcp-ui-container element
  resizeObserver.observe(mcpUiContainer);




  // Post size every 100ms for the first 5 seconds
  interval = setInterval(() => {
    postSize();
  }, 100);

  // Clear interval after 5 seconds
  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
</script>`;
