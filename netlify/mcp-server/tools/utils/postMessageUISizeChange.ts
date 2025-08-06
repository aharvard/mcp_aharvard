// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const mcpUiContainer = document.querySelector('.mcp-ui-container');
  
  // Function to post size to parent
  function postSize() {
    const height = mcpUiContainer.scrollHeight;
    const width = mcpUiContainer.scrollWidth;
    console.log('🔥🔥 postMessageUISizeChange', { height, width });
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

  // Post size when window loads
  // window.addEventListener('load', postSize);

  // Post size when DOM content is loaded
  // document.addEventListener('DOMContentLoaded', postSize);
</script>`;
