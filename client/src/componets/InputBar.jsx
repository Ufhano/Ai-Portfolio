export default function InputBar({
  value,
  onChange,
  onSend,
  placeholder = 'Ask a recruiter-style question',
}) {
  return (
    <footer className='input-bar'>
      <label className='kicker' htmlFor='ask'>
        PROMPT
      </label>
      <input
        id='ask'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button type='button' onClick={onSend}>
        SEND
      </button>
    </footer>
  );
}
