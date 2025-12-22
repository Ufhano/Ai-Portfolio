import {useState} from 'react';
import './App.css';
import {useChat} from './hooks/useChat';

import ChatContainer from './components/ChatContainer';
import MessageBubble from './components/MessageBubble';
import InputBar from './components/InputBar';
import SuggestionChips from './components/SuggestionChips';

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
      <ChatContainer>
        <main className='chat'>
          {messages.length === 1 && (
            <SuggestionChips suggestions={suggestions} onSelect={sendMessage} />
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              content={msg.content}
              createdAt={msg.createdAt}
            />
          ))}

          {loading && <div className='typing'>Typing</div>}
          <div ref={bottomRef} />
        </main>

        <InputBar
          value={input}
          onChange={setInput}
          onSend={() => {
            sendMessage(input);
            setInput('');
          }}
        />
      </ChatContainer>
    </div>
  );
}
