import { postMessageHeight } from "./utils/postMessageHeight";
import { addFontToHead } from "./utils/addFontToHead";

interface MoodTripData {
    userPreferences?: string;
    budget?: string;
    duration?: string;
}

export default function MoodTripPlanner(tripData?: MoodTripData) {
    // Mood-based destinations
    const moodDestinations = {
        adventurous: {
            destinations: ["New Zealand", "Costa Rica", "Iceland", "Nepal", "Patagonia"],
            activities: ["Bungee jumping", "Volcano hiking", "Glacier walking", "Mountain climbing", "Wildlife safari"]
        },
        relaxed: {
            destinations: ["Maldives", "Bali", "Santorini", "Tuscany", "Fiji"],
            activities: ["Beach lounging", "Spa treatments", "Wine tasting", "Sunset watching", "Meditation retreats"]
        },
        cultural: {
            destinations: ["Japan", "Morocco", "India", "Peru", "Egypt"],
            activities: ["Temple visits", "Local cooking classes", "Art galleries", "Historical tours", "Traditional festivals"]
        },
        romantic: {
            destinations: ["Paris", "Venice", "Kyoto", "Prague", "Santorini"],
            activities: ["Candlelit dinners", "Sunset cruises", "Couples spa", "Wine tours", "Historic walks"]
        },
        foodie: {
            destinations: ["Italy", "Thailand", "Mexico", "France", "Vietnam"],
            activities: ["Street food tours", "Cooking classes", "Wine tastings", "Market visits", "Michelin dining"]
        },
        party: {
            destinations: ["Ibiza", "Las Vegas", "Rio de Janeiro", "Bangkok", "Berlin"],
            activities: ["Beach clubs", "Rooftop bars", "Music festivals", "Night markets", "Dance clubs"]
        }
    };

    const style = `
<style>
  * {
    box-sizing: border-box;
  }
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1;
    --primary-color: #3b82f6;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --text-color: #1f2937;
    --light-bg: #f8fafc;
  }
  @supports (font-variation-settings: normal) {
    :root { font-family: InterVariable, sans-serif; }
  }
  html, body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  
  .mcp-ui-container {
    min-height: 500px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .trip-planner-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 600px;
    width: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .trip-planner-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .header {
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 10px 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .header p {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
  
  .mood-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .mood-button {
    background: white;
    border: 3px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .mood-button:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--primary-color);
  }
  
  .mood-button.selected {
    border-color: var(--secondary-color);
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 16px 32px rgba(16, 185, 129, 0.3);
  }
  
  .mood-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }
  
  .mood-button:hover::before {
    left: 100%;
  }
  
  .mood-emoji {
    font-size: 48px;
    margin-bottom: 12px;
    display: block;
    filter: grayscale(0.3);
    transition: all 0.3s ease;
  }
  
  .mood-button:hover .mood-emoji,
  .mood-button.selected .mood-emoji {
    filter: grayscale(0);
    transform: scale(1.1);
  }
  
  .mood-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
    text-transform: capitalize;
  }
  
  .mood-description {
    font-size: 12px;
    color: #6b7280;
    margin: 4px 0 0 0;
    opacity: 0.8;
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--primary-color), #2563eb);
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }
  
  .btn-secondary {
    background: #f3f4f6;
    color: var(--text-color);
    border: 2px solid #e5e7eb;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  .destination-reveal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
    border-radius: 20px;
  }
  
  .destination-reveal.show {
    opacity: 1;
    transform: scale(1);
  }
  
  .destination-content {
    text-align: center;
    color: white;
    max-width: 400px;
    padding: 20px;
  }
  
  .destination-emoji {
    font-size: 64px;
    margin-bottom: 20px;
    display: block;
    animation: bounce 1s ease-in-out;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
  
  .destination-title {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .destination-subtitle {
    font-size: 18px;
    margin: 0 0 24px 0;
    opacity: 0.9;
  }
  
  .destination-details {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
  }
  
  .destination-location {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #fbbf24;
  }
  
  .destination-activities {
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.5;
  }
  
  .new-trip-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }
  
  .new-trip-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  .sparkles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  .sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: sparkle 2s linear infinite;
  }
  
  @keyframes sparkle {
    0% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
  }
  
  .loading-animation {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 640px) {
    .mood-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    
    .mood-button {
      padding: 20px 12px;
    }
    
    .mood-emoji {
      font-size: 40px;
    }
    
    .trip-planner-card {
      padding: 24px;
      margin: 10px;
    }
    
    .header h1 {
      font-size: 24px;
    }
  }
</style>
`;

    const html = `
<article class="mcp-ui-container">
  <div class="trip-planner-card">
    <div class="header">
      <h1>✈️ Plan Your Perfect Trip</h1>
      <p>Tell us how you're feeling, and we'll suggest the perfect destination!</p>
    </div>
    
    <div class="mood-selection">
      <div class="mood-grid">
        <div class="mood-button" data-mood="adventurous" onclick="selectMood('adventurous')">
          <span class="mood-emoji">🏔️</span>
          <p class="mood-label">Adventurous</p>
          <p class="mood-description">Seeking thrills & excitement</p>
        </div>
        
        <div class="mood-button" data-mood="relaxed" onclick="selectMood('relaxed')">
          <span class="mood-emoji">🏖️</span>
          <p class="mood-label">Relaxed</p>
          <p class="mood-description">Need peace & tranquility</p>
        </div>
        
        <div class="mood-button" data-mood="cultural" onclick="selectMood('cultural')">
          <span class="mood-emoji">🏛️</span>
          <p class="mood-label">Cultural</p>
          <p class="mood-description">Explore history & traditions</p>
        </div>
        
        <div class="mood-button" data-mood="romantic" onclick="selectMood('romantic')">
          <span class="mood-emoji">💕</span>
          <p class="mood-label">Romantic</p>
          <p class="mood-description">Love is in the air</p>
        </div>
        
        <div class="mood-button" data-mood="foodie" onclick="selectMood('foodie')">
          <span class="mood-emoji">🍜</span>
          <p class="mood-label">Foodie</p>
          <p class="mood-description">Culinary adventures await</p>
        </div>
        
        <div class="mood-button" data-mood="party" onclick="selectMood('party')">
          <span class="mood-emoji">🎉</span>
          <p class="mood-label">Party</p>
          <p class="mood-description">Ready to celebrate life</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button id="clear-mood" class="btn btn-secondary" disabled onclick="clearMood()">
          Clear Selection
        </button>
        <button id="plan-trip" class="btn btn-primary" disabled onclick="planTrip()">
          Plan My Trip! ✨
        </button>
      </div>
    </div>
    
    <div class="loading-animation" id="loading">
      <div class="loading-spinner"></div>
    </div>
    
    <div class="destination-reveal" id="destination-reveal">
      <div class="sparkles" id="sparkles"></div>
      <div class="destination-content">
        <span class="destination-emoji" id="destination-emoji">🌟</span>
        <h2 class="destination-title">Your Perfect Destination</h2>
        <p class="destination-subtitle" id="destination-subtitle">Based on your mood...</p>
        
        <div class="destination-details">
          <p class="destination-location" id="destination-location">Loading...</p>
          <p class="destination-activities" id="destination-activities">Discovering amazing activities...</p>
        </div>
        
        <button class="btn new-trip-btn" onclick="startOver()">
          Plan Another Trip 🗺️
        </button>
      </div>
    </div>
  </div>
</article>
`;

    const handleInteractions = `
<script>
  let selectedMood = null;
  const moodDestinations = ${JSON.stringify(moodDestinations)};
  
  const moodEmojis = {
    adventurous: '🏔️',
    relaxed: '🏖️', 
    cultural: '🏛️',
    romantic: '💕',
    foodie: '🍜',
    party: '🎉'
  };

  function selectMood(mood) {
    selectedMood = mood;
    
    // Update UI
    document.querySelectorAll('.mood-button').forEach(button => {
      button.classList.remove('selected');
    });
    document.querySelector('[data-mood="' + mood + '"]').classList.add('selected');
    
    // Enable buttons
    document.getElementById('clear-mood').disabled = false;
    document.getElementById('plan-trip').disabled = false;
  }

  function clearMood() {
    selectedMood = null;
    
    // Update UI
    document.querySelectorAll('.mood-button').forEach(button => {
      button.classList.remove('selected');
    });
    
    // Disable buttons
    document.getElementById('clear-mood').disabled = true;
    document.getElementById('plan-trip').disabled = true;
  }

  function planTrip() {
    if (!selectedMood) return;
    
    // Show loading animation
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    
    // Hide mood selection temporarily
    document.querySelector('.mood-selection').style.opacity = '0.3';
    document.querySelector('.mood-selection').style.pointerEvents = 'none';
    
    setTimeout(() => {
      // Hide loading
      loading.style.display = 'none';
      
      // Get random destination and activities for the mood
      const moodData = moodDestinations[selectedMood];
      const randomDestination = moodData.destinations[Math.floor(Math.random() * moodData.destinations.length)];
      const randomActivities = moodData.activities.slice(0, 3).join(', ');
      
      // Update destination reveal content
      document.getElementById('destination-emoji').textContent = moodEmojis[selectedMood];
      document.getElementById('destination-subtitle').textContent = 'Perfect for your ' + selectedMood + ' mood!';
      document.getElementById('destination-location').textContent = randomDestination;
      document.getElementById('destination-activities').textContent = 'Enjoy: ' + randomActivities;
      
      // Create sparkles
      createSparkles();
      
      // Show destination reveal with animation
      const reveal = document.getElementById('destination-reveal');
      reveal.classList.add('show');
      
      // Send message to parent
      setTimeout(() => {
        window.parent.postMessage({
          type: 'tool',
          payload: {
            toolName: 'mood-trip-planner',
            params: {
              mood: selectedMood,
              destination: randomDestination,
              activities: moodData.activities.slice(0, 3),
              confirmed: true
            }
          }
        }, '*');
      }, 1000);
      
    }, 2000);
  }

  function startOver() {
    // Hide destination reveal
    const reveal = document.getElementById('destination-reveal');
    reveal.classList.remove('show');
    
    // Reset mood selection
    setTimeout(() => {
      clearMood();
      document.querySelector('.mood-selection').style.opacity = '1';
      document.querySelector('.mood-selection').style.pointerEvents = 'auto';
      
      // Clear sparkles
      document.getElementById('sparkles').innerHTML = '';
    }, 600);
  }

  function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    sparklesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 2 + 's';
      sparklesContainer.appendChild(sparkle);
    }
  }
</script>`;

    const htmlString = style + addFontToHead + html + postMessageHeight + handleInteractions;
    return htmlString;
}
