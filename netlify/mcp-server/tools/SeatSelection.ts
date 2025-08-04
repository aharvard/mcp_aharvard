import { postMessageHeight } from "./utils/postMessageHeight";

export default function SeatSelection() {
    // Generate random disabled seats (about 65% of 56 seats = ~36 seats)
    const totalSeats = 56;
    const disabledCount = Math.floor(totalSeats * 0.65); // ~36 seats
    const disabledSeats = new Set<number>();

    // Randomly select seats to disable
    while (disabledSeats.size < disabledCount) {
        const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
        disabledSeats.add(randomSeat);
    }

    const seat = (seatNumber: number) => {
        const isDisabled = disabledSeats.has(seatNumber);
        const disabledClass = isDisabled ? " disabled" : "";
        const disabledAttr = isDisabled ? "disabled" : "";
        const disabledStyle = isDisabled ? "pointer-events: none;" : "";

        // Convert seat number to airplane format (row + column)
        const getAirplaneSeatLabel = (seatNum: number) => {
            // Map seat numbers to actual grid positions
            const seatMap = [
                // Row 1: 4 seats (A, B, C, D)
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                51, 52, 53, 54, 55, 56,
            ];

            // Find the position of this seat in the grid
            const gridPosition = seatMap.indexOf(seatNum);

            // Calculate row and column based on grid position
            // Each row has different number of seats:
            // Row 1: 4 seats (A, B, C, D)
            // Row 2: 4 seats (A, B, C, D)
            // Row 3: 6 seats (A, B, C, D, E, F)
            // Row 4+: 6 seats (A, B, C, D, E, F)

            let row = 1;
            let colIndex = 0;

            // Row 1: 4 seats
            if (gridPosition < 4) {
                row = 1;
                colIndex = gridPosition;
            }
            // Row 2: 4 seats
            else if (gridPosition < 8) {
                row = 2;
                colIndex = gridPosition - 4;
            }
            // Row 3: 6 seats
            else if (gridPosition < 14) {
                row = 3;
                colIndex = gridPosition - 8;
            }
            // Row 4+: 6 seats each
            else {
                const remainingPos = gridPosition - 14;
                row = 4 + Math.floor(remainingPos / 6);
                colIndex = remainingPos % 6;
            }

            const columns = ["a", "b", "c", "d", "e", "f"];
            return `${row}${columns[colIndex]}`;
        };

        const seatLabel = getAirplaneSeatLabel(seatNumber);

        return `
  <button 
    class="seat${disabledClass}" 
    style="grid-area: seat-${seatNumber}; ${disabledStyle}" 
    ${disabledAttr}
    onclick="( function() { 
      if (!${isDisabled}) {
        handleClick(${seatNumber});
      }
    })()">
      <span class="seat-number-${seatNumber}" >${seatLabel}</span>
  </button>
  `;
    };

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
    display: flex;
    padding: 0 10px ;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: relative;
  }
  .cabin {
    background-color: #000000;
    background-color: gray;
    max-width: 350px;
    padding: 0 10px;
  }
  .selection-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 250px;
    max-width: 300px;
  }
  .card-header h3 {
    margin: 0 0 16px 0;
    color: #1f2937;
    font-size: 18px;
    font-weight: 600;
  }
  .card-content {
    margin-bottom: 20px;
  }
  .card-content p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }
  .card-actions {
    display: flex;
    gap: 8px;
  }
  .btn {
    padding: 12px 10px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-primary {
    background-color: #3b82f6;
    color: white;
  }
  .btn-primary:hover {
    background-color: #2563eb;
  }
  .btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
  }
  .btn-secondary:hover {
    background-color: #d1d5db;
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn:disabled:hover {
    background-color: inherit;
  }
  .seats {
    background-color: white;
    padding: 40px 10px;
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 30px 6px;
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
    background-color: #1e40af;
    color: #ffffff;
    border: 1px solid #3b82f6;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .seat:hover:not(.disabled) {
    background-color: #3b82f6;
    transform: scale(1.05);
  }
  
  .seat.disabled {
    background-color: #93c5fd;
    color: #6b7280;
    border-color: #d1d5db;
    cursor: not-allowed;
    opacity: 0.6;
  }
    
  .seat:nth-child(-n + 8) { 
    background-color: #7c3aed; 
  }
  
  .seat:nth-child(-n + 8).disabled {
    background-color: #c4b5fd;
    color: #6b7280;
  }
  
  .seat.selected {
    background-color: #10b981;
    border-color: #059669;
    transform: scale(1.1);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  }
  
  .thank-you-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #1f2937;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    z-index: -100;
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    /* Hidden by default, will be revealed when plane flies away */
  }
  
  .thank-you-message h2 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #059669;
  }
  
  .thank-you-message p {
    font-size: 18px;
    margin: 0;
    color: #6b7280;
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
    <div class="selection-card">
      <div class="card-header">
        <h3>Seat Selection</h3>
      </div>
      <div class="card-content">
        <div id="selection-status">
          <p>Please select a seat</p>
        </div>
        <div id="selected-seat-info" style="display: none;">
          <p><strong>Selected Seat:</strong> <span id="selected-seat-number"></span></p>
        </div>
      </div>
      <div class="card-actions">
        <button id="clear-selection" class="btn btn-secondary" disabled onclick="clearSelection()">
          Clear Selection
        </button>
        <button id="confirm-seat" class="btn btn-primary" disabled onclick="confirmSeat()">
          Confirm Seat
        </button>
      </div>
    </div>
    <div class="clouds"></div>
  </div>
  <div id="thank-you-message" class="thank-you-message">
    <h2>Thanks for flying with us!</h2>
    <p>Your seat has been confirmed.</p>
    <p><strong>Selected Seat:</strong> <span id="thank-you-seat-number"></span></p>
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
</script>`;

    const handleInteractions = `
<script>
  let selectedSeat = null;

  function handleClick(seatNumber) {
    if (selectedSeat === seatNumber) {
      // Deselect if clicking the same seat
      clearSelection();
      return;
    }
    
    // Update selected seat
    selectedSeat = seatNumber;
    
    // Update UI
    updateSelectionUI();
    
    // Highlight selected seat
    document.querySelectorAll('.seat').forEach(seat => {
      seat.classList.remove('selected');
    });
    document.querySelector('.seat[style*="seat-' + seatNumber + '"]').classList.add('selected');
  }

  function clearSelection() {
    selectedSeat = null;
    
    // Remove selection highlight
    document.querySelectorAll('.seat').forEach(seat => {
      seat.classList.remove('selected');
    });
    
    // Update UI
    updateSelectionUI();
  }

  function confirmSeat() {
    console.log('confirmSeat called with selectedSeat:', selectedSeat);
    if (selectedSeat) {
      // Add flying animation
      const sky = document.querySelector('.sky');
      console.log('Sky element found:', sky);
      sky.style.transition = 'transform 2s ease-in-out';
      sky.style.transform = 'translateY(-100vh)';
      
      // Reveal thank you message after a short delay
      setTimeout(() => {
        const thankYouMessage = document.getElementById('thank-you-message');
        const thankYouSeatNumber = document.getElementById('thank-you-seat-number');
        if (thankYouMessage && thankYouSeatNumber) {
          // Convert seat number to airplane format for display
          const getAirplaneSeatLabel = (seatNum) => {
            // Map seat numbers to actual grid positions
            const seatMap = [
              // Row 1: 4 seats (A, B, C, D)
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
              21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
              41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56
            ];
            
            // Find the position of this seat in the grid
            const gridPosition = seatMap.indexOf(seatNum);
            
            // Calculate row and column based on grid position
            let row = 1;
            let colIndex = 0;
            
            // Row 1: 4 seats
            if (gridPosition < 4) {
              row = 1;
              colIndex = gridPosition;
            }
            // Row 2: 4 seats  
            else if (gridPosition < 8) {
              row = 2;
              colIndex = gridPosition - 4;
            }
            // Row 3: 6 seats
            else if (gridPosition < 14) {
              row = 3;
              colIndex = gridPosition - 8;
            }
            // Row 4+: 6 seats each
            else {
              const remainingPos = gridPosition - 14;
              row = 4 + Math.floor(remainingPos / 6);
              colIndex = remainingPos % 6;
            }
            
            const columns = ['a', 'b', 'c', 'd', 'e', 'f'];
            return row + columns[colIndex];
          };
          
          thankYouSeatNumber.textContent = getAirplaneSeatLabel(selectedSeat);
          thankYouMessage.style.opacity = '1';
          console.log('Thank you message revealed with seat:', getAirplaneSeatLabel(selectedSeat));
        } else {
          console.log('Thank you message element not found');
        }
      }, 800);
      
      // Send message after animation starts
      setTimeout(() => {
        window.parent.postMessage({
          type: 'tool',
          payload: {
            toolName: 'seat-selection',
            params: {
              seatNumber: selectedSeat,
              confirmed: true
            }
          }
        }, '*');
      }, 500);
      
      // Send size change message after animation completes
      setTimeout(() => {
        // Ensure the plane stays hidden
        const sky = document.querySelector('.sky');
        sky.style.transform = 'translateY(-100vh)';
        sky.style.transition = 'none'; // Remove transition to prevent any animation
        sky.style.display = 'none'; // Completely hide the plane
        
        window.parent.postMessage({
          type: 'size-change',
          payload: {
            height: '400px',
            info: 'plane animation completed'
          }
        }, '*');
      }, 2000);
    }
  }

  function updateSelectionUI() {
    const statusDiv = document.getElementById('selection-status');
    const seatInfoDiv = document.getElementById('selected-seat-info');
    const seatNumberSpan = document.getElementById('selected-seat-number');
    const clearBtn = document.getElementById('clear-selection');
    const confirmBtn = document.getElementById('confirm-seat');
    
    if (selectedSeat) {
      // Convert seat number to airplane format
      const getAirplaneSeatLabel = (seatNum) => {
        // Map seat numbers to actual grid positions
        const seatMap = [
          // Row 1: 4 seats (A, B, C, D)
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56
        ];
        
        // Find the position of this seat in the grid
        const gridPosition = seatMap.indexOf(seatNum);
        
        // Calculate row and column based on grid position
        let row = 1;
        let colIndex = 0;
        
        // Row 1: 4 seats
        if (gridPosition < 4) {
          row = 1;
          colIndex = gridPosition;
        }
        // Row 2: 4 seats  
        else if (gridPosition < 8) {
          row = 2;
          colIndex = gridPosition - 4;
        }
        // Row 3: 6 seats
        else if (gridPosition < 14) {
          row = 3;
          colIndex = gridPosition - 8;
        }
        // Row 4+: 6 seats each
        else {
          const remainingPos = gridPosition - 14;
          row = 4 + Math.floor(remainingPos / 6);
          colIndex = remainingPos % 6;
        }
        
        const columns = ['a', 'b', 'c', 'd', 'e', 'f'];
        return row + columns[colIndex];
      };
      
      statusDiv.style.display = 'none';
      seatInfoDiv.style.display = 'block';
      seatNumberSpan.textContent = getAirplaneSeatLabel(selectedSeat);
      clearBtn.disabled = false;
      confirmBtn.disabled = false;
    } else {
      statusDiv.style.display = 'block';
      seatInfoDiv.style.display = 'none';
      clearBtn.disabled = true;
      confirmBtn.disabled = true;
    }
  }
</script>`;

    const htmlString =
        style + addFontToHead + html + postMessageHeight + handleInteractions;

    return htmlString;
}
