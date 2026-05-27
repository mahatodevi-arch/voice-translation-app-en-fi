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

---

## 📋 Anti-Gravity Translation App Overview

An intuitive web application that translates live voice input between English and Finnish with near-zero latency.

### 1️⃣ Code Generation
The core logic was built using **Anti-Gravity**. The prompt used:

> Give me a code for making a language translator which listens and translates the language to Finnish language. If the language is Finnish, it converts into English. I want output in text, but input should be live voice. There should be no latency. I should have a toggle button to have choice from English to Finnish or Finnish to English.

### 2️⃣ Local Environment Setup
Since this application uses the Web Speech API, it must run in a secure context (local server) to access the microphone.

1. Navigate to the project directory:
   ```bash
   cd "Translation_app"
   ```
2. Launch the local server with **npx serve**:
   ```bash
   npx serve
   ```
3. Open in browser:
   ```bash
   http://localhost:3000
   ```
   (Use Google Chrome or Microsoft Edge for full Web Speech API support.)

### 📸 Screenshots
*Placeholder images for UI*: (Add actual screenshots later)

![Demo](screenshot_demo.png)

### 📤 How to Move to GitHub
1. **Create a repository** on GitHub (e.g., `anti-gravity-translator`).
2. **Initialize Git locally**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Anti-gravity translator ready for deployment"
   ```
3. **Link and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/anti-gravity-translator.git
   git branch -M main
   git push -u origin main
   ```
4. Verify on GitHub that the files appear.

### 🛠️ Home Work Task
Tweak your application using **Gemini CLI**. Upload the link of the tweaked Git repo in a doc file.

### 🤖 Gemini CLI Overview
Installation (using npx):
```bash
npx @google/gemini-cli
```
Or install globally:
```bash
npm install -g @google/gemini-cli
```
Authentication options, basic usage, and examples are documented in the Gemini CLI docs.
---

