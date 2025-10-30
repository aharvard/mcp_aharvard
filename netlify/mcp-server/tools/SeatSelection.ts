import { addFontToHead } from "./utils/addFontToHead";
import { postMessageUISizeChange } from "./utils/postMessageUISizeChange";

interface FlightData {
    flightNumber: string;
    destination: string;
    origin?: string;
    date?: string;
    departureTime?: string;
}

export default function SeatSelection(flightData?: FlightData) {
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
  .mcp-ui-container {
    min-height: 380px;
    position: relative;
  } 
  
  .sky {
    background-color: #87CEEB;
    width: 100%;
    display: flex;
    padding: 0 10px ;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: relative;
    overflow: hidden;
    z-index: 1;
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
    margin: 0 0 10px 0;
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
  }
  
  .flight-info {
    margin-bottom: 16px;
    padding: 10px 12px;
    background-color: #f8fafc;
    border-radius: 6px;
    border-left: 3px solid #3b82f6;
  }
  
  .flight-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
  }
  
  .flight-details > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 16px;
  }
  
  .flight-details .label {
    color: #6b7280;
    font-weight: 500;
    min-width: 60px;
  }
  
  .flight-details .value {
    color: #1f2937;
    font-weight: 600;
    text-align: right;
  }
  
  .route .value {
    color: #059669;
    font-weight: 700;
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
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
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
    max-width: 400px;
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
  
  .flight-summary {
    margin-top: 16px;
    padding: 12px;
    background-color: #f0f9ff;
    border-radius: 6px;
    border: 1px solid #bae6fd;
  }
  
  .flight-summary p {
    font-size: 13px;
    margin: 3px 0;
    color: #1f2937;
    display: flex;
    justify-content: space-between;
  }
  
  .flight-summary p strong {
    color: #6b7280;
    font-weight: 500;
  }
  
  .flight-summary p:first-child {
    margin-top: 0;
  }
  
  .flight-summary p:last-child {
    margin-bottom: 0;
  }
  
  /* Cloud animations */
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    filter: contrast(0.9) brightness(1.1);
  }
  
  /* Add atmospheric noise overlay */
  .clouds::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.1), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.1), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.1), transparent);
    animation: noise 4s linear infinite;
  }
  
  @keyframes noise {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-5px, -5px); }
    20% { transform: translate(-10px, 5px); }
    30% { transform: translate(5px, -10px); }
    40% { transform: translate(-5px, 15px); }
    50% { transform: translate(-10px, 5px); }
    60% { transform: translate(15px, -5px); }
    70% { transform: translate(10px, 10px); }
    80% { transform: translate(3px, 15px); }
    90% { transform: translate(10px, 5px); }
    100% { transform: translate(5px, 0); }
  }
  
  .cloud {
    position: absolute;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.6) 50%, rgba(255,255,255,0.3) 100%);
    border-radius: 200px;
    opacity: 0.7;
    filter: blur(8px) contrast(0.8) brightness(1.2);
    box-shadow: 
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 40px rgba(255, 255, 255, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  .cloud:before,
  .cloud:after {
    content: '';
    position: absolute;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(240,248,255,0.5) 60%, rgba(255,255,255,0.2) 100%);
    border-radius: 150px;
    filter: blur(6px);
    box-shadow: 
      0 0 15px rgba(255, 255, 255, 0.3),
      0 0 30px rgba(255, 255, 255, 0.1);
  }
  
  .cloud-1 {
    width: 240px;
    height: 160px;
    left: 5%;
    animation: float1 12s linear infinite;
    transform: scale(2);
  }
  
  .cloud-1:before {
    width: 120px;
    height: 200px;
    top: -80px;
    left: 30px;
  }
  
  .cloud-1:after {
    width: 140px;
    height: 120px;
    top: -50px;
    right: 30px;
  }
  
  .cloud-1::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(240,248,255,0.3) 100%);
    border-radius: 100px;
    top: -5px;
    left: 30px;
    filter: blur(4px);
    opacity: 0.8;
  }
  
  .cloud-2 {
    width: 200px;
    height: 130px;
    left: 25%;
    animation: float2 16s linear infinite;
    transform: scale(2);
  }
  
  .cloud-2:before {
    width: 100px;
    height: 170px;
    top: -70px;
    left: 24px;
  }
  
  .cloud-2:after {
    width: 110px;
    height: 100px;
    top: -40px;
    right: 24px;
  }
  
  .cloud-3 {
    width: 280px;
    height: 180px;
    left: 45%;
    animation: float3 20s linear infinite;
    transform: scale(3);
  }
  
  .cloud-3:before {
    width: 140px;
    height: 240px;
    top: -100px;
    left: 40px;
  }
  
  .cloud-3:after {
    width: 160px;
    height: 140px;
    top: -60px;
    right: 40px;
  }
  
  .cloud-4 {
    width: 220px;
    height: 140px;
    left: 65%;
    animation: float4 14s linear infinite;
    transform: scale(2);
  }
  
  .cloud-4:before {
    width: 110px;
    height: 180px;
    top: -70px;
    left: 30px;
  }
  
  .cloud-4:after {
    width: 130px;
    height: 110px;
    top: -50px;
    right: 30px;
  }
  
  .cloud-5 {
    width: 180px;
    height: 110px;
    left: 85%;
    animation: float5 18s linear infinite;
    transform: scale(2);
  }
  
  .cloud-5:before {
    width: 90px;
    height: 150px;
    top: -60px;
    left: 20px;
  }
  
  .cloud-5:after {
    width: 100px;
    height: 80px;
    top: -30px;
    right: 20px;
  }
  
  .cloud-6 {
    width: 260px;
    height: 170px;
    left: 15%;
    animation: float6 22s linear infinite;
    transform: scale(3);
  }
  
  .cloud-6:before {
    width: 130px;
    height: 220px;
    top: -90px;
    left: 36px;
  }
  
  .cloud-6:after {
    width: 150px;
    height: 120px;
    top: -50px;
    right: 36px;
  }
  
  .cloud-7 {
    width: 190px;
    height: 120px;
    left: 55%;
    animation: float7 15s linear infinite;
    transform: scale(2);
  }
  
  .cloud-7:before {
    width: 96px;
    height: 160px;
    top: -60px;
    left: 24px;
  }
  
  .cloud-7:after {
    width: 116px;
    height: 90px;
    top: -36px;
    right: 24px;
  }
  
  .cloud-8 {
    width: 300px;
    height: 200px;
    left: 75%;
    animation: float8 24s linear infinite;
    transform: scale(4);
  }
  
  .cloud-8:before {
    width: 150px;
    height: 260px;
    top: -110px;
    left: 50px;
  }
  
  .cloud-8:after {
    width: 170px;
    height: 140px;
    top: -70px;
    right: 50px;
  }
  
  /* Add whispy noise elements to all clouds */
  .cloud::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(240,248,255,0.1) 100%);
    border-radius: 50px;
    filter: blur(5px);
    opacity: 0.6;
    animation: whisp 3s ease-in-out infinite alternate;
  }
  
  @keyframes whisp {
    0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
    100% { transform: scale(0.8) rotate(360deg); opacity: 0.4; }
  }
  
  .cloud-5:before {
    width: 35px;
    height: 35px;
    top: -12px;
    left: 8px;
  }
  
  .cloud-5:after {
    width: 40px;
    height: 20px;
    top: -8px;
    right: 8px;
  }
  
  @keyframes float1 {
    0% { top: -200px; transform: translateX(0px); }
    100% { top: 120%; transform: translateX(20px); }
  }
  
  @keyframes float2 {
    0% { top: -150px; transform: translateX(0px); }
    100% { top: 130%; transform: translateX(-15px); }
  }
  
  @keyframes float3 {
    0% { top: -300px; transform: translateX(0px); }
    100% { top: 140%; transform: translateX(30px); }
  }
  
  @keyframes float4 {
    0% { top: -180px; transform: translateX(0px); }
    100% { top: 125%; transform: translateX(-25px); }
  }
  
  @keyframes float5 {
    0% { top: -120px; transform: translateX(0px); }
    100% { top: 135%; transform: translateX(10px); }
  }
  
  @keyframes float6 {
    0% { top: -250px; transform: translateX(0px); }
    100% { top: 145%; transform: translateX(-20px); }
  }
  
  @keyframes float7 {
    0% { top: -160px; transform: translateX(0px); }
    100% { top: 128%; transform: translateX(15px); }
  }
  
  @keyframes float8 {
    0% { top: -400px; transform: translateX(0px); }
    100% { top: 150%; transform: translateX(-30px); }
  }
</style>
  `;

    const html = `
<article class="mcp-ui-container">
      <div class="sky">
      <div class="clouds">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        <div class="cloud cloud-4"></div>
        <div class="cloud cloud-5"></div>
        <div class="cloud cloud-6"></div>
        <div class="cloud cloud-7"></div>
        <div class="cloud cloud-8"></div>
      </div>
      <div class="cabin">
        <div class="seats">
          ${seats}
        </div>
      </div>
      <div class="selection-card">
        <div class="card-header">
          <h3>Seat Selection</h3>
          <div class="flight-info">
            <div class="flight-details">
              <div class="flight-number">
                <span class="label">Flight:</span>
                <span class="value">${
                    flightData?.flightNumber || "AA 1234"
                }</span>
              </div>
              <div class="route">
                <span class="label">Route:</span>
                <span class="value">${flightData?.origin || "SFO"} → ${
        flightData?.destination || "JFK"
    }</span>
              </div>
              <div class="date-time">
                <span class="label">Date:</span>
                <span class="value">${flightData?.date || "Dec 15, 2024"}</span>
              </div>
              <div class="departure">
                <span class="label">Departure:</span>
                <span class="value">${
                    flightData?.departureTime || "10:30 AM"
                }</span>
              </div>
            </div>
          </div>
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
    </div>
  <div id="thank-you-message" class="thank-you-message">
    <h2>Thanks for flying with us!</h2>
    <p>Your seat has been confirmed.</p>
    <div class="flight-summary">
      <p><strong>Flight:</strong> ${flightData?.flightNumber || "AA 1234"}</p>
      <p><strong>Route:</strong> ${flightData?.origin || "SFO"} → ${
        flightData?.destination || "JFK"
    }</p>
      <p><strong>Date:</strong> ${flightData?.date || "Dec 15, 2024"}</p>
      <p><strong>Selected Seat:</strong> <span id="thank-you-seat-number"></span></p>
    </div>
  </div>
</article>
  `;

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
    console.log('⚾️confirmSeat called with selectedSeat:', selectedSeat);
    if (selectedSeat) {
      // Add flying animation
      const sky = document.querySelector('.sky');
      console.log('⚾️Sky element found:', sky);
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
          console.log('⚾️Thank you message revealed with seat:', getAirplaneSeatLabel(selectedSeat));
        } else {
          console.log('⚾️Thank you message element not found');
        }
      }, 800);
      
      // Send message after animation starts
      setTimeout(() => {
        window.parent.postMessage({
          type: 'notify',
          payload: {
            message: 'Seat confirmed!',
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
        
        // Measure the thank you message div
        const thankYouMessage = document.getElementById('thank-you-message');
        let height = 400; // Default fallback height
        
        if (thankYouMessage) {
          // Make sure the message is visible to get accurate height
          thankYouMessage.style.opacity = '1';
          thankYouMessage.style.zIndex = '100';
          
          // Force a reflow to ensure accurate measurement
          thankYouMessage.offsetHeight;
          
          height = thankYouMessage.getBoundingClientRect().height;
          // Add more padding to ensure the message looks good and isn't cut off
          height += 80;
          console.log('⚾️Thank you message measured height:', height);
        }
        
        window.parent.postMessage({
          type: 'size-change',
          payload: {
            height: height + 'px',
            info: 'measured thank you message height'
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
        style +
        addFontToHead +
        html +
        postMessageUISizeChange({ aggressive: false }) +
        handleInteractions;

    return htmlString;
}
