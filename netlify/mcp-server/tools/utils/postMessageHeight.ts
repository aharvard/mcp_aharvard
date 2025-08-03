// inform MCP host of UI height
export const postMessageHeight = `
<script>
  // Function to post height to parent
  function postHeight(info) {
    const mcpUIContainer = document.querySelector('.mcp-ui-container');
    const height = mcpUIContainer ? mcpUIContainer.getBoundingClientRect().height : document.documentElement.scrollHeight;
    
    window.parent.postMessage({ 
      type: 'size-change', 
      payload: {         
        height: height + 'px',
        info: info
      } 
    }, '*');
  }

  // Post height immediately
  postHeight("initial");

  // Post height after a short delay to ensure content is loaded
  // setTimeout(postHeight, 100);

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


  // Post height when DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => postHeight("DOMContentLoaded"));
</script>
  `;
