// Speech Recognition Initialization
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
}

// UI Elements
const micBtn = document.getElementById('mic-btn');
const langToggle = document.getElementById('lang-toggle');
const originalText = document.getElementById('original-text');
const translatedText = document.getElementById('translated-text');
const voiceBars = document.getElementById('voice-bars');
const langFromLabel = document.getElementById('lang-from');
const langToLabel = document.getElementById('lang-to');

let isListening = false;
let currentTranscript = "";

// Language Configuration
const configs = {
  enToFi: { from: 'en-US', to: 'fi', labelFrom: 'EN', labelTo: 'FI' },
  fiToEn: { from: 'fi-FI', to: 'en', labelFrom: 'FI', labelTo: 'EN' }
};

let currentConfig = configs.enToFi;

// Update labels based on toggle
function updateLabels() {
  if (langToggle.checked) {
    currentConfig = configs.fiToEn;
    langFromLabel.style.color = '#94a3b8';
    langToLabel.style.color = '#f8fafc';
  } else {
    currentConfig = configs.enToFi;
    langFromLabel.style.color = '#f8fafc';
    langToLabel.style.color = '#94a3b8';
  }
  
  if (recognition) {
    recognition.lang = currentConfig.from;
  }
}

langToggle.addEventListener('change', updateLabels);
updateLabels(); // Initial call

// Translation Logic
async function translateText(text, from, to) {
  if (!text) return;
  
  try {
    // Using MyMemory API (Free, no key required for low volume)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
    const data = await response.json();
    
    if (data.responseData) {
      translatedText.textContent = data.responseData.translatedText;
      translatedText.classList.remove('placeholder');
    }
  } catch (err) {
    console.error("Translation error:", err);
    translatedText.textContent = "Error in translation";
  }
}

// Speech Recognition Handlers
if (recognition) {
  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('active');
    voiceBars.classList.add('active');
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('active');
    voiceBars.classList.remove('active');
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const displayText = finalTranscript || interimTranscript;
    if (displayText) {
      originalText.textContent = displayText;
      originalText.classList.remove('placeholder');
      
      // Translate in real-time if we have a significant chunk or final result
      if (finalTranscript) {
        translateText(finalTranscript, currentConfig.from.split('-')[0], currentConfig.to);
      } else if (interimTranscript.length > 3) {
        // Subtle debounce could be added here for interim translation
        translateText(interimTranscript, currentConfig.from.split('-')[0], currentConfig.to);
      }
    }
  };

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    isListening = false;
    micBtn.classList.remove('active');
    voiceBars.classList.remove('active');
  };
} else {
  originalText.textContent = "Speech Recognition not supported in this browser.";
}

// Button Interaction
micBtn.addEventListener('click', () => {
  if (isListening) {
    recognition.stop();
  } else {
    originalText.textContent = "Listening...";
    translatedText.textContent = "Translation will appear here";
    translatedText.classList.add('placeholder');
    recognition.start();
  }
});
