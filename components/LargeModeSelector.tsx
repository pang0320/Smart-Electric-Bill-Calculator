interface ModeOption<T extends string> {
  value: T;
  label: string;
}

interface LargeModeSelectorProps<T extends string> {
  value: T;
  options: ModeOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
}

export function LargeModeSelector<T extends string>({
  value,
  options,
  onChange,
  ariaLabel
}: LargeModeSelectorProps<T>) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
              selected
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-300 bg-white text-slate-800 hover:border-sky-500"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
