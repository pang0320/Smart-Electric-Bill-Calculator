interface NumberInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  error?: string | null;
  onChange: (value: string) => void;
}

export function NumberInput({ id, label, placeholder, value, error, onChange }: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-lg font-bold text-slate-900">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="number"
        min={0}
        step="0.01"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full rounded-2xl border-2 border-slate-300 bg-white px-4 text-xl text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-base font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
