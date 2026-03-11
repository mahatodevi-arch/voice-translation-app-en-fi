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
const videoFeed = document.getElementById('video-feed');
const subtitleOverlay = document.getElementById('subtitle-overlay');

let isListening = false;
let currentTranscript = "";

// Camera Initialization
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    videoFeed.srcObject = stream;
  } catch (err) {
    console.error("Camera access error:", err);
    subtitleOverlay.textContent = "Camera access denied or not available";
  }
}

initCamera();

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
    langToLabel.style.color = '#1e293b';
  } else {
    currentConfig = configs.enToFi;
    langFromLabel.style.color = '#1e293b';
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
      const translation = data.responseData.translatedText;
      translatedText.textContent = translation;
      translatedText.classList.remove('placeholder');

      // Update subtitles
      subtitleOverlay.textContent = translation;
      subtitleOverlay.style.opacity = "1";
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
    subtitleOverlay.textContent = "Listening...";
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
      } else if (interimTranscript.length > 5) { // Higher threshold for subtitle stability
        translateText(interimTranscript, currentConfig.from.split('-')[0], currentConfig.to);
      }
    }
  };

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    isListening = false;
    micBtn.classList.remove('active');
    voiceBars.classList.remove('active');
    subtitleOverlay.textContent = "Recognition Error";
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
    subtitleOverlay.textContent = "Waiting for speech...";
    recognition.start();
  }
});
