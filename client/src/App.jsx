import {useState} from 'react';
import './App.css';
import {useChat} from './hooks/useChat';

export default function App() {
  const [input, setInput] = useState('');
  const {messages, loading, sendMessage, bottomRef} = useChat();

  const suggestions = [
    'Summarize Ufhano’s experience',
    'What technologies does he specialize in?',
    'Tell me about his DevOps experience',
    'What kind of roles is he best suited for?',
  ];

  return (
    <div className='app'>
      <div className='chat-container'>
        <header className='chat-header'>AI-Resume</header>

        <main className='chat'>
          {messages.length === 1 && (
            <div className='suggestions'>
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  className='suggestion'
                  onClick={() => sendMessage(text)}
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`bubble ${msg.role}`}>
              <div className='message-content'>{msg.content}</div>
              <div className='timestamp'>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}

          {loading && <div className='typing'>Typing</div>}
          <div ref={bottomRef} />
        </main>

        <footer className='input-bar'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask a recruiter-style question…'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input);
                setInput('');
              }
            }}
          />
          <button
            onClick={() => {
              sendMessage(input);
              setInput('');
            }}
          >
            ➤
          </button>
        </footer>
      </div>
    </div>
  );
}
