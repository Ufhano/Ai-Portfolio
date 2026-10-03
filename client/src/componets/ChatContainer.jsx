export default function ChatContainer({children}) {
  return (
    <section className='chat-container panel'>
      <header className='chat-header'>
        <span className='kicker'>ASK</span>
        <h2>Ufhano</h2>
        <span className='status'>
          <span className='status-dot' /> ONLINE
        </span>
      </header>
      {children}
    </section>
  );
}
