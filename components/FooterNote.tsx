interface FooterNoteProps {
  note: string;
}

export function FooterNote({ note }: FooterNoteProps) {
  return <p className="py-6 text-center text-sm font-semibold text-slate-600">{note}</p>;
}
