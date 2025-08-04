// inform MCP host of UI height
export const postMessageHeight = `
<script>
  // Function to post height to parent
  function postHeight(info) {
    const mcpUIContainer = document.querySelector('.mcp-ui-container');
    const height = mcpUIContainer ? mcpUIContainer.getBoundingClientRect().height : document.documentElement.scrollHeight;

  console.log('posting height', {height});
    
    window.parent.postMessage({ 
      type: 'size-change', 
      payload: {         
        height: height + 'px',
        info: info
      } 
    }, '*');
  }

  // Create ResizeObserver to watch for size changes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Post height whenever document size changes
      postHeight("resize");
    }
  });

  // Start observing the document element
  resizeObserver.observe(document.documentElement);

  // Also observe the body element for additional coverage
  resizeObserver.observe(document.body);
</script>
  `;
