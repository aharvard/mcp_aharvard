// inform MCP host of UI height
export const postMessageUISizeChange = (
    props: { aggressive?: boolean } = {}
) => `
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
    console.log('posting size', height, width);
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



  if(${props.aggressive ?? false}) { 
    interval = setInterval(() => {
      postSize();
    }, 100);
  }


</script>`;
