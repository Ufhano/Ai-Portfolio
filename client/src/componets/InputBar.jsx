export default function InputBar({
  value,
  onChange,
  onSend,
  placeholder = 'Ask a recruiter-style question…',
}) {
  return (
    <footer className='input-bar'>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button onClick={onSend}>➤</button>
    </footer>
  );
}
