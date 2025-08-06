// inform MCP host of UI height
export const postMessageUISizeChange = `
<script>
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      window.parent.postMessage(
        {
          type: "ui-size-change",
          payload: {
            height: entry.contentRect.height,
          },
        },
        "*",
      );
    });
  });
  resizeObserver.observe(document.documentElement)
</script>`;
