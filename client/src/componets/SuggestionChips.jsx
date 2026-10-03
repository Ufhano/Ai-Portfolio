export default function SuggestionChips({suggestions, onSelect}) {
  return (
    <div className='suggestions'>
      <span className='kicker'>PROMPTS</span>
      {suggestions.map((text, i) => (
        <button key={i} type='button' className='suggestion' onClick={() => onSelect(text)}>
          {text}
        </button>
      ))}
    </div>
  );
}
