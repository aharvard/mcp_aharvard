import { postMessageHeight } from "./utils/postMessageHeight";

export default function SeatSelection() {
  const seat = (seatNumber: number) => `
  <button class="seat" style="grid-area: seat-${seatNumber};">
    <span class="seat-number-${seatNumber}" >${seatNumber}</span>
  </button>
  `;

  const seats = Array.from({ length: 56 }, (_, i) => seat(i + 1)).join("");

  const style = `
<style>
  * {
    box-sizing: border-box;
  }
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    --card-background-color: #000000;
    --card-text-color: #ffffff;
  }
  @supports (font-variation-settings: normal) {
    :root { font-family: InterVariable, sans-serif; }
  }
  html, body {
   overflow: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  .mcp-ui-container {}
  
  .sky {
    background-color: #87CEEB;
    width: 100%;
    display: grid;
    place-items: center;
  }

  .seats {
    max-width: 350px;
    padding: 40px 10px;
    background-color: gray;
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 30px 10px;
    grid-template-areas:
      "seat-1 seat-1 seat-1 seat-2 seat-2 seat-2 . seat-3 seat-3 seat-3 seat-4 seat-4 seat-4"
      "seat-5 seat-5 seat-5 seat-6 seat-6 seat-6 . seat-7 seat-7 seat-7 seat-8 seat-8 seat-8"
      "seat-9 seat-9 seat-10 seat-10 seat-11 seat-11 . seat-12 seat-12 seat-13 seat-13 seat-14 seat-14"
      "seat-15 seat-15 seat-16 seat-16 seat-17 seat-17 . seat-18 seat-18 seat-19 seat-19 seat-20 seat-20"
      "seat-21 seat-21 seat-22 seat-22 seat-23 seat-23 . seat-24 seat-24 seat-25 seat-25 seat-26 seat-26"
      "seat-27 seat-27 seat-28 seat-28 seat-29 seat-29 . seat-30 seat-30 seat-31 seat-31 seat-32 seat-32"
      "seat-33 seat-33 seat-34 seat-34 seat-35 seat-35 . seat-36 seat-36 seat-37 seat-37 seat-38 seat-38"
      "seat-39 seat-39 seat-40 seat-40 seat-41 seat-41 . seat-42 seat-42 seat-43 seat-43 seat-44 seat-44"
      "seat-45 seat-45 seat-46 seat-46 seat-47 seat-47 . seat-48 seat-48 seat-49 seat-49 seat-50 seat-50"
      "seat-51 seat-51 seat-52 seat-52 seat-53 seat-53 . seat-54 seat-54 seat-55 seat-55 seat-56 seat-56"
      ;
  }
  .seat {
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 10px;
  }
    
  .seat:nth-child(-n + 8) { 
    background-color: red; 
  }
</style>
  `;

  const html = `
<article class="mcp-ui-container">
  <div class="sky">
    <div class="cabin">
      <div class="seats">
        ${seats}
      </div>
    </div>
    <div class="clouds"></div>
  </div>
</article>
  `;

  const addFontToHead = `
<script>
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://rsms.me/';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = 'https://rsms.me/inter/inter.css';
  document.head.appendChild(link2);
</script>
    `;

  const htmlString = style + html + postMessageHeight + addFontToHead;

  return htmlString;
}
