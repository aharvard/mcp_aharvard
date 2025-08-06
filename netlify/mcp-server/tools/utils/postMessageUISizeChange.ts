// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      console.log("postMessageUISizeChange from mcp_aharvard", entry.contentRect.height, entry.contentRect.width);
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
  resizeObserver.observe(document.documentElement)
</script>`;
