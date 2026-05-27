# SanaAI - Voice Translation App

SanaAI is a real-time, voice-sensing translation application that bridges communication between **English** and **Finnish**. Designed with a focus on low-latency and a premium user experience, it allows users to speak naturally and see instant translations. (App name is DeviAI)

## 🚀 Features

- **Live Voice Sensing**: Uses the Web Speech API with `interimResults` to show transcription immediately as you speak.
- **Bi-directional Translation**: Toggle between EN → FI and FI → EN with a single click.
- **Premium UI**: Modern dark-mode interface with glassmorphism, pulse animations, and live voice visualizations.
- **Zero-Latency Feel**: Real-time updates ensure that the translation process feels instantaneous.
- **Micro-Animations**: Hover effects and active state visualizations for an interactive experience.

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Build Tool**: [Vite](https://vitejs.dev/) for a lightning-fast development environment.
- **APIs**:
  - **Web Speech API**: For real-time voice-to-text recognition.
  - **MyMemory Translation API**: For fast, accurate translation without requiring complex API keys.
- **Design**: Custom CSS design system with Inter and Outfit typography.

## 📂 Project Structure

- `index.html`: Main application structure and SEO-optimized metadata.
- `src/style.css`: A comprehensive custom design system (dark mode, glassmorphism).
- `src/main.js`: Core logic for speech recognition, language toggling, and translation.
- `public/`: Static assets such as the Vite icon.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Running

1. **Clone or download** the project folder.
2. **Navigate** to the project directory in your terminal:
   ```bash
   cd Translation_app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the app**: Visit the local URL provided in your terminal (usually `http://localhost:5173/`).

## 🎙️ How to Use

1. Click the **Mic Button** (purple icon) to activate voice sensing.
2. Grant microphone permissions if prompted by your browser.
3. Speak clearly in the source language.
4. Use the **toggle switch** at the top to change the translation direction (EN-FI or FI-EN).

---
*Built with ❤️ for real-time communication.*
