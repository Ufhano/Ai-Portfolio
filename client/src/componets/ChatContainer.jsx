export default function ChatContainer({children}) {
  return (
    <div className='chat-container'>
      <header className='chat-header'>AI-Resume</header>
      {children}
    </div>
  );
}
