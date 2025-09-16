import { addFontToHead } from "./utils/addFontToHead";
import { listenForMessageFromParent } from "./utils/listenForMessageFromParent";
import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";
import { postMessageUIAction } from "./utils/postMessageUIAction";

export function MCPUITalk(START_SLIDE = 1) {
    function slide(child: string) {
        return `<section class="slide">${child}</section>`;
    }

    const titleSlide = slide(
        `
<div class="title-slide">
<svg height="5rem" viewBox="0 0 805 1027" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M579.187 1016.54L502.842 935.664C500.208 932.873 495.666 933.239 493.512 936.417L446.808 1005.34C437.507 1019.07 416.317 1015.13 412.57 998.978L347.966 720.495C344.096 703.814 360.744 689.764 376.537 696.38L649.293 810.648C668.277 818.601 666.918 845.942 647.238 851.973L571.566 875.165C568.809 876.01 567.824 879.406 569.703 881.594L639.266 962.637C651.534 976.929 649.371 998.572 634.518 1010.15L622.134 1019.81C609.117 1029.96 590.517 1028.54 579.187 1016.54Z"/><path d="M739.703 707.446C746.054 707.486 751.17 712.667 751.13 719.018C751.09 725.369 745.909 730.486 739.558 730.446L624.034 729.716C617.683 729.676 612.568 724.494 612.608 718.143C612.648 711.792 617.829 706.676 624.18 706.716L739.703 707.446ZM393.507 599.961C397.434 594.969 404.665 594.105 409.657 598.032L486.023 658.104C491.015 662.031 491.878 669.261 487.951 674.253C484.025 679.244 476.795 680.108 471.803 676.181L395.436 616.109C390.444 612.182 389.581 604.952 393.507 599.961ZM683.033 563.259C687.618 558.865 694.898 559.021 699.292 563.606C703.687 568.192 703.532 575.471 698.947 579.866L605.555 669.366C600.969 673.76 593.69 673.605 589.295 669.019C584.901 664.434 585.055 657.154 589.641 652.759L683.033 563.259ZM528.39 636.255V498.495C528.39 492.144 533.539 486.995 539.89 486.995C546.241 486.995 551.39 492.143 551.39 498.495V636.255C551.39 642.607 546.241 647.755 539.89 647.755C533.539 647.755 528.39 642.607 528.39 636.255Z"/><path d="M449.316 134.264C461.448 122.131 481.119 122.131 493.252 134.264C505.384 146.396 505.384 166.067 493.252 178.199L233.294 438.156C196.897 474.552 196.896 533.566 233.295 569.967C269.693 606.361 328.705 606.361 365.103 569.966L625.06 310.009C637.192 297.876 656.864 297.876 668.996 310.009C681.129 322.141 681.129 341.812 668.996 353.944L553.065 469.876C549.056 468.027 544.594 466.995 539.89 466.995C522.493 466.995 508.39 481.098 508.39 498.495V514.551L432.436 590.505L422.022 582.313C408.348 571.558 388.544 573.922 377.788 587.596C367.033 601.269 369.397 621.073 383.07 631.829L385.164 633.475C324.824 673.648 242.585 667.126 189.359 613.903L189.358 613.902C128.696 553.237 128.694 454.882 189.358 394.22L449.316 134.264Z"/><path d="M361.443 46.3905C422.106 -14.2718 520.462 -14.2733 581.123 46.3915C617.055 82.3223 631.701 131.476 625.068 178.188C671.166 171.642 719.642 185.821 755.443 220.724L756.871 222.136L758.699 223.966L760.11 225.394C819.361 286.164 818.891 383.459 758.699 443.648L758.698 443.647L664.548 537.798L620.505 493.969L714.764 399.711C751.163 363.313 751.163 304.301 714.764 267.903L712.936 266.072C676.535 229.674 617.521 229.675 581.121 266.073L319.337 527.86C319.323 527.874 319.307 527.888 319.293 527.902L315.675 531.521C303.542 543.654 283.872 543.654 271.739 531.521C259.607 519.389 259.606 499.718 271.738 487.585L537.186 222.136C573.585 185.738 573.586 126.725 537.187 90.328L537.185 90.3261C500.791 53.9299 441.778 53.9286 405.378 90.327L53.8879 441.817C41.7552 453.95 22.0849 453.95 9.95231 441.817C-2.18029 429.685 -2.18034 410.013 9.95231 397.881L361.443 46.3905Z"/></g></svg>
<h1>MCP-UI</h1>
  <p>a standardized approach that allows MCP servers to respond with interactive UI</p>
</div>
        `
    );

    const intro = slide(
        `
<h2>MCP-UI</h2>
<ul>
  <li>conforms to the MCP spec</li>
  <li>UI returned from tool calls as embedded resource</li>
  <li>types: rawHtml, externalUrl, remoteDom</li>
</ul>
      `
    );

    //     const mcpToolResponses = slide(
    //         `
    // <h2>MCP tools can send</h2>
    // <h3>as of 2025-06-18</h3>
    // <ul>
    //   <li>text</li>
    //   <li>image</li>
    //   <li>audio</li>
    //   <li>resource</li>
    //   <li>resource link</li>
    // </ul>
    //       `
    //     );

    const embeddedResource = slide(
        `
<h2>MCP-UI Resource</h2>
<pre>
{
  "type": "resource",
  "resource": {
    "uri": "ui://my-resource",
    "mimeType": "text",
    "text": "&lt;h1&gt;Hello World&lt;/h1&gt;"
  }
}
</pre>
    `
    );

    const McpUiSdk = slide(
        `
<h2>MCP-UI SDKs</h2>
<h3>@mcp-ui/server</h3>
<ul>
  <li>helps generate resource object</li>
  <li>typescript & ruby (python coming soon)</li>
</ul>
<br />
<h3>@mcp-ui/client</h3>
<ul>
  <li>Used in Goose</li>
  <li>react & web-components</li>
  <li>manages iframe</li>
</ul>
`
    );

    const UiResourceTypes = slide(`
<h2>MCP-UI Resource Types</h2>
<ul>
  <li>Raw HTML content</li>
  <li>External URL</li>
  <li>Remote DOM</li>
</ul>
      `);

    const earlyDays = slide(
        `
<h2>Early days</h2>
<ul>
  <li>Goose was the one of first MCP-UI enabled host (Postman shipped support same week)</li>
  <li>Shopify announced</li>
</ul>
    `
    );

    const future = slide(
        `
<h2>Future</h2>
<ul>
  <li>ChatGPT now supports MCP, will they support MCP-UI?</li>
  <li>g2! but kgoose lacks support for embedded resources</li>
  <li>Agentic experiences for our brands</li>
</ul>
    `
    );

    const pickAirplaneSeats = postMessageUIAction({
        type: "prompt",
        payload: {
            prompt: "Select seats for my flight from SF to Charlotte",
        },
    });

    const demoTime = slide(
        `
<h2>Demo time!</h2>
<button class="prompt-button" onclick="( function() { console.log('clicked'); window.parent.postMessage${pickAirplaneSeats} } )()">
  Pick airplane seats
</button>
    `
    );

    const html = `
<article class="mcp-ui-container">
  <div class="deck">
    ${[
        titleSlide,
        intro,
        // mcpToolResponses,
        embeddedResource,
        McpUiSdk,
        UiResourceTypes,
        earlyDays,
        future,
        demoTime,
    ]
        .map((slide) => slide)
        .join("")}
  </div>
  <div class="buttons">
    <button class='nav-button' id="previous"></button>
    <button class='nav-button' id="next"></button>
  </div>
  <div class="slide-counter">1 / 8</div>
  
  <script>
    // get elements
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector('#previous');
    const nextButton = document.querySelector('#next');
    const slideCounter = document.querySelector('.slide-counter');

    
    // init state
    let currentSlideIndex = ${START_SLIDE};
    const slideCount = slides.length;
    console.log(currentSlideIndex/slideCount + '%')
    
    const setSlideCounter = () => slideCounter.textContent = currentSlideIndex + ' / ' + slideCount
    setSlideCounter();
    
  
    // set up nav buttons
    function handleClick(event) { 
      slides[currentSlideIndex-1].classList.remove("active")
      
      if (event.target.id === 'next') {
        if (currentSlideIndex < slideCount) {
          currentSlideIndex += 1
        } else {
         currentSlideIndex = 1
        }
      } else {
       if (currentSlideIndex === 1) {
          currentSlideIndex = slideCount - 1
        } else {
          currentSlideIndex -= 1
        }
      }


      slides[currentSlideIndex-1].classList.add("active")
    setSlideCounter();
      
      
    };
    prevButton.addEventListener("click", handleClick);
    nextButton.addEventListener("click", handleClick);

    // hide slides
    slides.forEach((slide, index) => {
      if (index+1 === currentSlideIndex) {
        slide.classList.add("active");
        return
      }

    });
    
  </script>
</article>
`;

    const styles = `
<style>
* {
box-sizing: border-box;
margin: 0;
padding: 0;
}

:root {
// font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// font-feature-settings: 'liga' 1, 'calt' 1;
font-family: 'dank mono';
}
@supports (font-variation-settings: normal) {
// :root { font-family: 'InterVariable', sans-serif; }
}


/* Dark theme (default) */
:root,
[data-theme="dark"] {
--bg-primary: #0f0f0f;
--bg-secondary: #1a1a1a;
--bg-tertiary: #2a2a2a;
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
--highlight: #cb00b9;
--accent-color: #3b82f6;
--accent-hover: #60a5fa;
--border-color: #333333;
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}

/* Light theme */
[data-theme="light"] {
--bg-primary: #ffffff;
--bg-secondary: #f7f7f7;
--bg-tertiary: #f1f5f9;
--text-primary: #1e293b;
--text-secondary: #64748b;
--highlight: yellow;
--accent-color: #3b82f6;
--accent-hover: #2563eb;
--border-color: #e2e8f0;
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

:root {
font-size: 2vw;
}
::selection {
background: var(--highlight);
} 


html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow: hidden;
}

.mcp-ui-container {
  // padding: 1rem;
}

.title-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  text-align: center;
  height: 100%;
}

.title-slide h1 {
  font-size: 3rem;
  margin: 1rem 0;
}

.title-slide p {
  font-size: 1.2rem;
  max-width: 55ch;
}

.deck{
  display: grid;
  gap: 1rem;
}

.slide {
  aspect-ratio: 16/9;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem 4rem;
  display: none;
}

h2 {
  font-size: 3rem;
}

h3 {
  font-size: 1.4rem;
  margin-top: .4rem;
  margin-bottom: .4rem;
  text-transform: uppercase;
  }

ul {
  padding-left: 1.1rem;
}
  
p, li {
  font-size: 1.4rem
}

li {
  padding-left: 1rem;
}

pre {
  background: var(--bg-secondary);
  padding: 1rem;
}
.active {
  display: block;
}

.buttons {
  position: absolute;
  bottom:1rem;
  left: 0;
  right:0;
  display: flex;
  justify-content: center ;
  gap: 1rem;
  padding: 0rem;
  opacity: .2;
  transition: 500ms all ease;
}

.buttons:hover{
  opacity: 1;
}

.nav-button {
  aspect-ratio: 1;
  font-size: 3rem;
  width: 1em;
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 250ms ease;
}

.nav-button:hover {
  scale: 1.5;
}

.nav-button::after{
  content: '';
  display: block;
  inset: 0;
  position: absolute;
  border: .1em solid var(--text-secondary);
  border-left: none;
  border-bottom: none;
  rotate: 45deg;
  scale: .35;
}

.nav-button#previous::after{
  rotate: -135deg;
}

.prompt-button {
  color: var(--accent-color);
  background: transparent;
  border: none;
  padding: 0;
  font-family: 'dank mono';
  font-size: 1.5rem;
  cursor: pointer;
}

.slide-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1rem;
  color: var(--text-secondary);
  opacity: 0.7;
  font-family: 'dank mono';
}

</style>
`;
    return (
        addFontToHead +
        styles +
        html +
        postMessageUISizeChange +
        listenForMessageFromParent
    );
}
