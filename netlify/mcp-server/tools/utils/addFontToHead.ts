export const addFontToHead = `
<script>
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://rsms.me/';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = 'https://rsms.me/inter/inter.css';
  document.head.appendChild(link2);
</script>`;
