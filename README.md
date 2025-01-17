# Electron OpenAI Assistant

This is a minimal Electron.js application that allows users to interact with the OpenAI real-time assistant using voice commands. The app captures audio while a button is pressed and sends it to the assistant for processing. The assistant's responses are displayed in the UI, and visual feedback is provided for its activity.

---

## Features

- Voice input using a button press-and-hold mechanism.
- Audio recording starts only when the button is pressed and stops when released.
- Integration with the OpenAI GPT-4o real-time preview API.
- Visual indicator changes color when the assistant is speaking.
- Basic UI with minimal dependencies.

---

## Setup Instructions

### Install Electron
```
npm init -y

npm install electron --save-dev
```

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Clone the Repository

Clone the project to your local machine:
```
git clone https://github.com/your-username/electron-openai-assistant.git
cd electron-openai-assistant
```

### Start the application

```
npx electron .
```