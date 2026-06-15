type SuggestedPromptsProps = {
  prompts: string[];
  disabled?: boolean;
  onSelect: (prompt: string) => void;
};

export function SuggestedPrompts({
  prompts,
  disabled = false,
  onSelect,
}: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="cursor-pointer rounded-full border border-sky-700 bg-white px-3.5 py-2 text-left text-xs font-medium text-sky-800 shadow-sm transition hover:bg-sky-50 hover:text-sky-900 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-70"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}