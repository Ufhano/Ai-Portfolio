export default function MessageBubble({role, content, createdAt}) {
  const label = role === 'user' ? 'USER' : 'ASSIST';

  return (
    <article className={`log-row ${role}`}>
      <div className='log-meta'>
        <span className='kicker'>{label}</span>
        <time>
          {new Date(createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
      <div className='message-content'>{content}</div>
    </article>
  );
}
