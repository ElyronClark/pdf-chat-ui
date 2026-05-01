# PDF Chat UI

React frontend for the PDF Chat app. Upload a PDF and ask questions about it in a chat interface. Supports multiple PDFs via session management.

## Features
- PDF upload with indexing status
- Session-based PDF management
- Chat interface with conversation history
- Disabled input until PDF is uploaded
- Clean responsive UI

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Make sure `pdf-chat` backend is running on `http://127.0.0.1:8000`
4. Run: `npm run dev`
5. Open: `http://localhost:5173`

## Stack
- React 18
- Vite
- CSS (no UI library)

## Backend
Requires [pdf-chat](https://github.com/ElyronClark/pdf-chat) to be running.