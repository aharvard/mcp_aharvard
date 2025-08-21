// Listen for messages from parent window and send ready message
export const listenForMessageFromParent = `
<script>
console.log('listenForMessageFromParent');
window.addEventListener('message', (event) => {
  if (event.data.type === 'ui-lifecycle-iframe-render-data') {
    console.log(event);
  }
});

window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');
</script>`;
