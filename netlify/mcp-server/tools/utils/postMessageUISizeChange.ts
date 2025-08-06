// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  console.log("🔥 postMessageUISizeChange from mcp_aharvard");
  
  // Function to post size to parent
  function postSize() {
    const height = document.documentElement.scrollHeight;
    const width = document.documentElement.scrollWidth;
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

  // Post size immediately
  postSize();

  // Post size after a short delay to ensure content is loaded
  setTimeout(postSize, 100);

  // Create ResizeObserver to watch for size changes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Post size whenever document size changes
      postSize();
    }
  });

  // Start observing the document element
  resizeObserver.observe(document.documentElement);

  // Also observe the body element for additional coverage
  resizeObserver.observe(document.body);

  // Post size when window loads
  window.addEventListener('load', postSize);

  // Post size when DOM content is loaded
  document.addEventListener('DOMContentLoaded', postSize);
</script>`;
