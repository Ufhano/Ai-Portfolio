import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi 👋 I’m an AI assistant that answers questions about Ufhano Tshivhidzo.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, {role: 'user', content: input}]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        {role: 'assistant', content: res.data.reply},
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
        <header className='chat-header'>
          <span>ChatGPT-style Assistant</span>
        </header>

        <main className='chat'>
          {messages.map((msg, i) => (
            <div key={i} className={`bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}

          {loading && <div className='typing'>Typing…</div>}
          <div ref={bottomRef} />
        </main>

        <footer className='input-bar'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask a recruiter-style question…'
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </footer>
      </div>
    </div>
  );
}
