export default function SuggestionChips({suggestions, onSelect}) {
  return (
    <div className='suggestions'>
      {suggestions.map((text, i) => (
        <button key={i} className='suggestion' onClick={() => onSelect(text)}>
          {text}
        </button>
      ))}
    </div>
  );
}
