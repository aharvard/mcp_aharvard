// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      contentRect.height, entry.contentRect.width);
      window.parent.postMessage(
        {
          type: "ui-size-change",
          payload: {
            height: entry.contentRect.height,
            width: entry.contentRect.width, 
          },
        },
        "*",
      );
    });
  });
  const container = document.querySelector('.mcp-ui-container');
  console.log("postMessageUISizeChange from mcp_aharvard", container);
  if (container) {
    resizeObserver.observe(container);
  }
</script>`;
