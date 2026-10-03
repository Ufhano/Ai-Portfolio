import {useState} from 'react';
import './App.css';
import {useChat} from './hooks/useChat';

import ChatContainer from './componets/ChatContainer';
import MessageBubble from './componets/MessageBubble';
import InputBar from './componets/InputBar';
import SuggestionChips from './componets/SuggestionChips';

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
      <div className='sphere' aria-hidden='true' />
      <div className='stage'>
        <aside className='spec-card panel'>
          <span className='kicker'>SPEC</span>
          <h1>Ufhano Tshivhidzo</h1>
          <p className='role'>MERN stack · DevOps</p>
          <dl className='spec-list'>
            <div>
              <dt>UI</dt>
              <dd>React</dd>
            </div>
            <div>
              <dt>API</dt>
              <dd>Node</dd>
            </div>
            <div>
              <dt>DATA</dt>
              <dd>MongoDB</dd>
            </div>
            <div>
              <dt>SHIP</dt>
              <dd>Docker</dd>
            </div>
          </dl>
          <div className='spec-links'>
            <a href='https://github.com/Ufhano' target='_blank' rel='noreferrer'>
              GITHUB
            </a>
            <a
              href='https://www.linkedin.com/in/ufhano-tshivhidzo/'
              target='_blank'
              rel='noreferrer'
            >
              LINKEDIN
            </a>
          </div>
        </aside>

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

            {loading && (
              <div className='log-row typing'>
                <div className='log-meta'>
                  <span className='kicker'>ASSIST</span>
                </div>
                <div className='message-content'>Composing</div>
              </div>
            )}
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

        <aside className='project-card panel'>
          <span className='kicker'>OBJECT</span>
          <h3>AI Portfolio</h3>
          <p>A recruiter chat for skills, projects, and DevOps.</p>
          <span className='status'>
            <span className='status-dot' /> LIVE
          </span>
        </aside>
      </div>
    </div>
  );
}
