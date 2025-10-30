export const addFontToHead = `
<script>
  // Add CSP meta tag
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' blob: data:; style-src * 'unsafe-inline' https://rsms.me; style-src-elem * 'unsafe-inline' https://rsms.me; font-src * data: https://rsms.me; img-src * data: blob:; connect-src *; media-src *; object-src *; child-src *; frame-src *;";
  document.head.appendChild(meta);

  // Add font preconnect and stylesheet
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://rsms.me/';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = 'https://rsms.me/inter/inter.css';
  document.head.appendChild(link2);
</script>`;
