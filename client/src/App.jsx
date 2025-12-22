import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi 👋 I’m Ufhano’s AI portfolio assistant.\n\nYou can ask me about his skills, experience, projects, or DevOps background — or click one of the suggestions below to get started.',
      createdAt: Date.now(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = [
    'Summarize Ufhano’s experience',
    'What technologies does he specialize in?',
    'Tell me about his DevOps experience',
    'What kind of roles is he best suited for?',
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, loading]);

  const sendMessage = async (messageOverride) => {
    const message = messageOverride ?? input;

    if (!message.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {role: 'user', content: message, createdAt: Date.now()},
    ]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message,
      });
      await new Promise((resolve) => setTimeout(resolve, 600));

      setMessages((prev) => [
        ...prev,
        {role: 'assistant', content: res.data.reply, createdAt: Date.now()},
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className='app'>
      <div className='chat-container'>
        <header className='chat-header'>AI-Resume</header>

        <main className='chat'>
          {/* Starter Suggestions */}
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

          {/* Messages */}
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
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={() => sendMessage()}>➤</button>
        </footer>
      </div>
    </div>
  );
}
