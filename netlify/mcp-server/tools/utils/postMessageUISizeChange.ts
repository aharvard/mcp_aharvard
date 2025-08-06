// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const entryHeight = entry.getBoundingClientRect().height;
      const entryWidth = entry.getBoundingClientRect().width;
      console.log('🔥', { entryHeight, entryWidth });
      window.parent.postMessage(
        {
          type: "ui-size-change",
          payload: {
            height: entryHeight,
            width: entryWidth, 
          },
        },
        "*",
      );
    });
  });
  const container = document.querySelector('.mcp-ui-container');
  console.log("🔥 postMessageUISizeChange from mcp_aharvard", container);
  if (container) {
    resizeObserver.observe(container);
  }
</script>`;
