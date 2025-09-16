// inform MCP host of UI height
export const postMessageUISizeChange = (
    props: { aggressive?: boolean } = {
        aggressive: false,
    }
) => {
    const setup = `
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
`;

    const resizeObserver = `
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // Post size whenever document size changes
    postSize();
  }
});
resizeObserver.observe(mcpUiContainer);
  `;

    return `
<script>
${setup}
${resizeObserver}
${props.aggressive ? `setInterval(() => postSize(), 1000);` : ""}
</script>
`;
};
