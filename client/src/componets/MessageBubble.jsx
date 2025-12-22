export default function MessageBubble({role, content, createdAt}) {
  return (
    <div className={`bubble ${role}`}>
      <div className='message-content'>{content}</div>
      <div className='timestamp'>
        {new Date(createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
}
