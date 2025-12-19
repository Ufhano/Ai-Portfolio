import {useState} from 'react';
import axios from 'axios';

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

  const sendMessage = async () => {
    if (!input.trim()) return;

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
    } catch (err) {
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
    <div style={styles.container}>
      <div style={styles.chat}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.bubble,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#2563eb' : '#111',
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div style={styles.typing}>Typing...</div>}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask a recruiter-style question...'
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: '#0b0b0b',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
  chat: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
  },
  bubble: {
    padding: '12px',
    borderRadius: '10px',
    maxWidth: '70%',
    lineHeight: '1.4',
  },
  inputRow: {
    display: 'flex',
    borderTop: '1px solid #222',
  },
  input: {
    flex: 1,
    padding: '14px',
    background: '#111',
    color: 'white',
    border: 'none',
    outline: 'none',
  },
  button: {
    padding: '14px 20px',
    background: '#2563eb',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  typing: {
    opacity: 0.6,
    fontSize: '14px',
  },
};
