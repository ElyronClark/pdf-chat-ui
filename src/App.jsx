import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [sessionId, setSessionId] = useState(null)

const uploadPDF = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('http://127.0.0.1:8000/upload', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    setSessionId(data.session_id)
    setUploaded(true)
    setUploading(false)
    setMessages([{ role: 'assistant', content: `PDF uploaded. ${data.message}. Ask me anything about it.` }])
}
  const sendMessage = async () => {
    if (!input.trim() || !uploaded) return
    
    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    
    const response = await fetch('http://127.0.0.1:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input, session_id: sessionId })
    })
    
    const data = await response.json()
    setMessages([...updatedMessages, { role: 'assistant', content: data.answer }])
    setLoading(false)
  }

  

  return (
    <div className="container">
      <h1>PDF Chat</h1>
      <div className="upload-area">
        <input type="file" accept=".pdf" onChange={uploadPDF} id="file-input" />
        <label htmlFor="file-input">
          {uploading ? 'Indexing PDF...' : uploaded ? 'PDF Ready ✓' : 'Upload PDF'}
        </label>
      </div>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <span className="bubble">{msg.content}</span>
          </div>
        ))}
        {loading && <div className="message assistant"><span className="bubble">Thinking...</span></div>}
      </div>
      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={uploaded ? 'Ask a question about your PDF...' : 'Upload a PDF first'}
          disabled={!uploaded}
        />
        <button onClick={sendMessage} disabled={loading || !uploaded}>Send</button>
      </div>
    </div>
  )
}

export default App