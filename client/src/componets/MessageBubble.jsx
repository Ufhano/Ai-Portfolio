const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function MessageText({content}) {
  const parts = content.split(URL_PATTERN);

  return parts.map((part, index) => {
    if (!part.startsWith('http')) return <span key={index}>{part}</span>;

    const href = part.replace(/[.,]+$/, '');
    const trailing = part.slice(href.length);

    return (
      <span key={index}>
        <a href={href} target='_blank' rel='noreferrer'>
          {href}
        </a>
        {trailing}
      </span>
    );
  });
}

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
      <div className='message-content'>
        <MessageText content={content} />
      </div>
    </article>
  );
}
